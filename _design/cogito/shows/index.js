function( doc, req )
{  
    var ddoc = this;
    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );

    var text = "Markdown *rocks*.";
    var markdown = require( "vendor/couchapp/lib/markdown" );
    var md_html = markdown.encode( text );
    return md_html;

    return Mustache.to_html(
        ddoc.templates.index,
        {
            header : {assets : path.asset()},
            scripts : {},
            footer : {},
            doc : doc,
            docid : JSON.stringify((doc && doc._id) || null),
            assets : path.asset(),
            md_html : md_html
        },
        ddoc.templates.partials
    );
}
