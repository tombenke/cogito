function( doc, req )
{
    var templating = require( "vendor/droids/lib/templating" );

    templating.wrap_mdtext_into_template( doc, req, this, "intro" );
}
