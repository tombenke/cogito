function( doc, req )
{
    var ddoc = this;
    var pageTemplate = ddoc.templates.documentNotFound;

    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );
    
    if( doc )
    {
        pageTemplate = ddoc.templates.project;
    }

    return Mustache.to_html(
        pageTemplate,
        {
            header : {assets : path.asset()},
            top_menu : {},
            left_sidebar : {},
            main : {},
            right_sidebar : {},
            scripts : {},
            footer : {},
            doc : doc,
            docid : JSON.stringify((doc && doc._id) || null),
            assets : path.asset()
        },
        ddoc.templates.partials
    );
}