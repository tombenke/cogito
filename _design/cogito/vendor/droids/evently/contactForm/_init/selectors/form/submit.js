function(e)
{
    var form = $(this);
    var newDoc = form.serializeObject();
    /*
    var newDoc = {
        contact_title : $('select[name=contact_title]', this).val(),
        firstname : $('input[name=contact_firstname]', this).val(),
        familyname : $('input[name=contact_familyname]', this).val()
    };*/

    $$(this).app.db.saveDoc( newDoc, {
        success: function( resp )
        {
            alert('Form data succesfully saved.');
        }
    });

    return false;
}