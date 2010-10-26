function( doc, req )
{
    var templating = require( "vendor/droids/lib/templating" );

    templating.wrap_show_into_template( doc, req, this, "contact" );
}
