exports.wrap_list_into_template = function( head, req, ddoc, template_name )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );
    var path = require( "vendor/couchapp/lib/path" ).init( req );

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
                header : {assets : path.asset()},
                top_menu : {
                    listPath : path.list(),
                    showPath : path.show()
                },
                left_sidebar : {
                    listPath : path.list(),
                    showPath : path.show()
                },
                right_sidebar : {},
                scripts : {},
                footer : {},
                head : head,
                req : req,
                rows : head.rows,
                userCtx : head.userCtx,
                assets : path.asset(),
                main : Mustache.to_html(
                    ddoc.templates.partials[ template_name ],
                    {
                        assets : path.asset(),
                        listPath : path.list(),
                        showPath : path.show(),
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

    if( doc )
    {
        pageTemplate = ddoc.templates.partials[ template_name ];
    }

    send( Mustache.to_html(
        ddoc.templates.main,
        {
            header : {assets : path.asset()},
            top_menu : {
                listPath : path.list(),
                showPath : path.show()
            },
            left_sidebar : {
                listPath : path.list(),
                showPath : path.show()
            },
            right_sidebar : {},
            scripts : {},
            footer : {},
            assets : path.asset(),
            listPath : path.list(),
            showPath : path.show(),
            main : Mustache.to_html(
                pageTemplate,
                {
                    assets : path.asset(),
                    listPath : path.list(),
                    showPath : path.show(),
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
            header : {assets : path.asset()},
            top_menu : {
                listPath : path.list(),
                showPath : path.show()
            },
            left_sidebar : {
                listPath : path.list(),
                showPath : path.show()
            },
            right_sidebar : {},
            scripts : {},
            footer : {},
            assets : path.asset(),
            main : html
        },
        ddoc.templates.partials
    ));
}
