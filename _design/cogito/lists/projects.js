function( head, req )
{
    var templating = require( "vendor/droids/lib/templating" );

    templating.wrap_list_into_template( head, req, this, "projects" );
}
