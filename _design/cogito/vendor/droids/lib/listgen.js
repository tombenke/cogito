exports.to_html = function( head, req )
{
    var db_name = req.info.db_name
    var ddoc_name = req.path["2"];
    var host = req.headers.Host;
    var ddoc_namespace = 'http://' + host + '/1.0/' + ddoc_name;

    provides( 'html', function()
    {
        send( '<html>' );
        send( '<body>' );
        send( '<div id="' + db_name + '" xmlns="' + ddoc_namespace + '">\n' );

        send( '<ol>\n' );
        while( row = getRow() )
        {
            send( '<li><ul>\n' );
            for (var key in row.value )
            {
                send( '<li>' );

                send( '   <span class="key">' );
                send( key + ':</span>' );

                send( '<span class="value">' );
                send( row.value[ key ] );
                send( '</span>' );

                send( '</li>\n' );
            }
            send( '</ul></li>\n' );
        }

        send( '</ol>\n</div></body>' );
        return "</html>";
    });

}

exports.to_json = function( head, req )
{
    start({
        "headers": {
            "Content-Type" : "application/json"
        }
    });
    send('{"head":'+toJSON(head)+', ');
    send('"req":'+toJSON(req)+', ');
    send('"rows":[');
    var row, sep = '\n';
    while (row = getRow()) {
        send(sep + toJSON(row));
        sep = ', \n';
    }
    return "]}";
}

exports.to_xml = function( head, req )
{
    provides( "xml", function()
    {
        send( '<feed xmlns="http://www.w3.org/2005/Atom">' );
        send( '<title>' + req.info.db_name +
              ' / ' + req.path["2"] +
              ' XML Feed</title>\n' );

        while( row = getRow() )
        {
            for (var key in row.value )
            {
                var entry = new XML( '<entry/>' );
                entry.key = key;
                entry.value = row.value[key];
                send( entry );
                send( '\n' );
            }
        }
        return "</feed>";
    });
}

// Helpers for writing server-side _list functions, borrowed from couchdb lib
exports.withRows = function( fun )
{
    var f = function()
    {
        var row = getRow();
        return row && fun( row );
    };
    f.iterator = true;
    return f;
}

exports.send = function( chunk )
{
    send( chunk + "\n" )
}
