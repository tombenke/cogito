function( head, req )
{  
    var ddoc = this;
    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );
    var List = require("vendor/droids/lib/listgen");

    provides( 'html', function()
    {
        send( Mustache.to_html(
            ddoc.templates.projects,
            {
                header : {assets : path.asset()},
                top_menu : {},
                left_sidebar : {},
                main : {},
                right_sidebar : {},
                scripts : {},
                footer : {},
                head : head,
                req : req,
                rows : head.rows,
                userCtx : head.userCtx,
                assets : path.asset(),
                project_list : List.renderItem()
            },
            ddoc.templates.partials
        ));
    });
}
