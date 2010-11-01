exports.setupPageCtx = function ( doc, req, ddoc )
{
    var path = require( "vendor/couchapp/lib/path" ).init( req );
   
    var pageCtx = {
        assets : path.asset(),
        listPath : path.list(),
        showPath : path.show(),
        doc : doc,
        req : req,
        ddoc : ddoc,
        userCtx : req.userCtx,
        pageTitle : "Default Page Title"
    };

    if( hasRole( req.userCtx, "customer" ) )
    {
        pageCtx.isCustomer = true;
    }
    else if( hasRole( req.userCtx, "agent" ) )
    {
        pageCtx.isAgent = true;
    }
    else if( hasRole( req.userCtx, "admin" ) )
    {
        pageCtx.isAdmin = true;
    }
    else
    {
        pageCtx.isGuest = true;
    }

    return pageCtx;
}


hasRole = function( userCtx, role )
{
    return userCtx.roles.indexOf( role ) != -1
};

/*
exports.wrap_list_into_template_old = function( head, req, ddoc, template_name )
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
                header_guest : {
                    assets : assets,
                    listPath : listPath,
                    showPath : showPath
                },
                main_navigation_guest : {
                    assets : assets,
                    listPath : listPath,
                    showPath : showPath
                },
                main_content_guest : {
                    assets : assets,
                    listPath : listPath,
                    showPath : showPath
                },
                advertisements : {},
                assets : assets,
                scripts : { assets : assets },
                footer : {},
                head : head,
                req : req,
                rows : head.rows,
                userCtx : head.userCtx,
                mainContent : Mustache.to_html(
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
*/

exports.wrap_list_into_template = function( pageCtx )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );

    provides( 'html', function()
    {

        pageCtx.list_items = [];

        while( row = getRow() )
        {
            var v = row.value;
            pageCtx.list_items.push( v );
        }

        var pageTemplate = pageCtx.ddoc.templates.partials[ pageCtx.mainContentName ];

        var html = Mustache.to_html(
            pageTemplate,
            pageCtx,
            pageCtx.ddoc.templates.partials
        );

        pageCtx.mainContent = html;

        exports.wrap_into_template( pageCtx );
    });
}


exports.wrap_show_into_template = function( pageCtx )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );

    var pageTemplate = pageCtx.ddoc.templates.partials.documentNotFound;

    if( pageCtx.doc )
    {
        pageTemplate = pageCtx.ddoc.templates.partials[ pageCtx.mainContentName ];
    }

    var html = Mustache.to_html(
        pageTemplate,
        pageCtx,
        pageCtx.ddoc.templates.partials
    );

    pageCtx.mainContent = html;

    exports.wrap_into_template( pageCtx );
}


exports.wrap_mdtext_into_template = function( pageCtx )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );

    var markdown = require( "vendor/couchapp/lib/markdown" );
    var text = pageCtx.ddoc.mdtext[ pageCtx.mainContentName ];
    var html = markdown.encode( text );

    pageCtx.mainContent = html;

    exports.wrap_into_template( pageCtx );
}


exports.wrap_partial_into_template = function( pageCtx )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );

    var html = Mustache.to_html(
        pageCtx.ddoc.templates.partials[ pageCtx.mainContentName ],
        pageCtx,
        pageCtx.ddoc.templates.partials
    );

    pageCtx.mainContent = html;

    exports.wrap_into_template( pageCtx );
}


exports.wrap_into_template = function( pageCtx )
{
    var Mustache = require( "vendor/couchapp/lib/mustache" );

    send( Mustache.to_html(
        pageCtx.ddoc.templates.main,
        pageCtx,
        pageCtx.ddoc.templates.partials
    ));
}
