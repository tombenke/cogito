function( head, req )
{
    var listgen = require( "vendor/droids/lib/listgen" );

    listgen.through_template( head, req, this, "projects" );
}
