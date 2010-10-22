function( doc, req )
{  
    var ddoc = this;
    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );

    return Mustache.to_html(
        ddoc.templates.contacts,
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
