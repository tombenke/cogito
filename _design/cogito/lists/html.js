function( head, req )
{
    var listgen = require( "vendor/droids/lib/listgen" );

    listgen.to_html( head, req );
}