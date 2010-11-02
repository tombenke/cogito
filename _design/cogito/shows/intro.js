function( doc, req )
{
    var templating = require( "vendor/droids/lib/templating" );
    var pageCtx = templating.setupPageCtx( doc, req, this );

    pageCtx.pageTitle = "Home";
    pageCtx.mainContentName = "intro"

    templating.wrap_mdtext_into_template( pageCtx );
}
