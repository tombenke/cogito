exports.wrap_list_into_template = function( head, req, ddoc, template_name )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );
    var assets = path.asset();
    var listPath = path.list();
    var showPath = path.show();

    provides( 'html', function()
    {
        var items = [];
        while( row = getRow() )
        {
            var v = row.value;
            items.push( v );
        }

        send( Mustache.to_html(
            ddoc.templates.main,
            {
                header : { assets : assets },
                top_menu : {
                    listPath : listPath,
                    showPath : showPath
                },
                left_sidebar : {
                    listPath : listPath,
                    showPath : showPath
                },
                right_sidebar : {},
                assets : assets,
                scripts : { assets : assets },
                footer : {},
                head : head,
                req : req,
                rows : head.rows,
                userCtx : head.userCtx,
                main : Mustache.to_html(
                    ddoc.templates.partials[ template_name ],
                    {
                        assets : assets,
                        listPath : listPath,
                        showPath : showPath,
                        item_list : items
                    },
                    ddoc.templates.partials
                )
            },
            ddoc.templates.partials
        ));
    });
}

exports.wrap_show_into_template = function( doc, req, ddoc, template_name )
{
    var pageTemplate = ddoc.templates.partials.documentNotFound;

    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );
    var assets = path.asset();
    var listPath = path.list();
    var showPath = path.show();

    if( doc )
    {
        pageTemplate = ddoc.templates.partials[ template_name ];
    }

    send( Mustache.to_html(
        ddoc.templates.main,
        {
            header : { assets : assets },
            top_menu : {
                listPath : listPath,
                showPath : showPath
            },
            left_sidebar : {
                listPath : listPath,
                showPath : showPath
            },
            right_sidebar : {},
            assets : assets,
            scripts : { assets : assets },
            footer : {},
            listPath : listPath,
            showPath : showPath,
            main : Mustache.to_html(
                pageTemplate,
                {
                    assets : assets,
                    listPath : listPath,
                    showPath : showPath,
                    doc : doc,
                    docid : JSON.stringify((doc && doc._id) || null)
                },
                ddoc.templates.partials
            )
        },
        ddoc.templates.partials
    ));
}

exports.wrap_mdtext_into_template = function( doc, req, ddoc, md_name )
{
    var pageTemplate = ddoc.templates.partials.documentNotFound;

    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );
    var assets = path.asset();
    var listPath = path.list();
    var showPath = path.show();
    var markdown = require( "vendor/couchapp/lib/markdown" );

    var text = ddoc.mdtext[ md_name ];
    var html = markdown.encode( text );

    if( doc )
    {
        pageTemplate = ddoc.templates.partials[ template_name ];
    }

    send( Mustache.to_html(
        ddoc.templates.main,
        {
            header : { assets : assets },
            top_menu : {
                listPath : listPath,
                showPath : showPath
            },
            left_sidebar : {
                listPath : listPath,
                showPath : showPath
            },
            right_sidebar : {},
            assets : assets,
            scripts : { assets : assets },
            footer : {},
            main : html
        },
        ddoc.templates.partials
    ));
}
