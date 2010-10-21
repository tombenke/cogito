function( doc )
{
    if( doc.summary )
    {
        var words = doc.summary.toLowerCase().replace(/[^a-z]+/g, ' ').split(' ');
        for( word in words )
        {
            emit( words[ word ], 1 );
        }
    }
}
