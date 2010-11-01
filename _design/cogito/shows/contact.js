function( doc, req )
{
    var templating = require( "vendor/droids/lib/templating" );

    var pageCtx = templating.setupPageCtx( doc, req, this );

    pageCtx.pageTitle = "Contact";
    pageCtx.mainContentName = "contact"

    templating.wrap_show_into_template( pageCtx );
}
