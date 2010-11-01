function( head, req )
{
    var templating = require( "vendor/droids/lib/templating" );

    var pageCtx = templating.setupPageCtx( null, req, this );

    pageCtx.pageTitle = "Projects";
    pageCtx.mainContentName = "projects";
    templating.wrap_list_into_template( pageCtx );
}
