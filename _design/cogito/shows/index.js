function( doc, req )
{  
    var ddoc = this;
    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );
/*
    var text = "Markdown *rocks*.";
    var markdown = require( "vendor/couchapp/lib/markdown" );
    var md_html = markdown.encode( text );
*/
    return Mustache.to_html(
        ddoc.templates.index,
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
