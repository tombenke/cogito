function()
{
    provides('html',function(){

        send( '<html><body><div id="users" xmlns="http://www.marketa.hu/1.0/users">' );

        send('<ul>');
        while( row = getRow() )
        {
            send('<li>');

            send( '<span class="_id">_id : "' + row.value._id + '"</span></br>');
            send( '<span class="_id">_rev : "' + row.value._rev + '"</span></br>');
            send( '<span class="_id">type : "' + row.value.type + '"</span></br>');

            send( '<span class="_id">familyName : "' + row.value.familyName + '"</span></br>');
            send( '<span class="_id">sureName : "' + row.value.sureName + '"</span></br>');
            send( '<span class="_id">company : "' + row.value.company + '"</span></br>');
            send( '<span class="_id">taxIdNumber : "' + row.value.taxIdNumber + '"</span></br>');
            send( '<span class="_id">hq : "' + row.value.hq + '"</span></br>');
            send( '<span class="_id">hq_city : "' + row.value.hq_city + '"</span></br>');
            send( '<span class="_id">hq_zip : "' + row.value.hq_zip + '"</span></br>');
            send( '<span class="_id">hq_street : "' + row.value.hq_street + '"</span></br>');
            send( '<span class="_id">hq_number : "' + row.value.hq_number + '"</span></br>');

/*

            entry.familyName = row.value.familyName;
            entry.sureName = row.value.sureName;
            entry.company = row.value.company;
            entry.taxIdNumber = row.value.taxIdNumber;
            entry.hq = row.value.hq;
            entry.hq_city = row.value.hq_city;
            entry.hq_zip = row.value.hq_zip;
            entry.hq_street = row.value.hq_street;
            entry.hq_number = row.value.hq_number;

            entry.sites = new XML('<div class="sites"/>');

            entry.sites.site[0] = new XML('<div class="site"/>');
            entry.sites.site[0].city = row.value.site1_city;
            entry.sites.site[0].zip = row.value.site1_zip;
            entry.sites.site[0].street = row.value.site1_street;
            entry.sites.site[0].number = row.value.site1_number;

            entry.sites.site[1] = new XML('<div class="site"/>');
            entry.sites.site[1].city = row.value.site2_city;
            entry.sites.site[1].zip = row.value.site2_zip;
            entry.sites.site[1].street = row.value.site2_street;
            entry.sites.site[1].number = row.value.site2_number;

            entry.address = row.value.address;
            entry.address_city = row.value.address_city;
            entry.address_zip = row.value.address_zip;
            entry.address_street = row.value.address_street;
            entry.address_number = row.value.address_number;
            entry.mobile = row.value.mobile;
            entry.phone = row.value.phone;
            entry.fax = row.value.fax;
            entry.email = row.value.email;
            entry.web = row.value.web;
            entry.contact = row.value.contact;
            entry.category = row.value.category;
            entry.subcategory = row.value.subcategory;
            entry.username = row.value.username;
            entry.password = row.value.password;
            entry.status = row.value.status;
            entry.expirationDate = row.value.expirationDate;
            entry.attachments = row.value.attachments;
            entry.images = row.value.images;
            entry.docs = row.value.docs;
            entry.description = row.value.description;

            */
            send( '</li>' );
        }
        send( '</ul>' );
        return "</div></body></html>";
    });

    provides('xml',function(){
        send( '<users xmlns="http://www.marketa.hu/1.0/users">' );

        while( row = getRow() )
        {
            var entry = new XML( '<user/>' );

            entry._id = row.value._id;
            entry._rev = row.value._rev;
            entry.type = row.value.type;

            entry.familyName = row.value.familyName;
            entry.sureName = row.value.sureName;
            entry.company = row.value.company;
            entry.taxIdNumber = row.value.taxIdNumber;
            entry.hq = row.value.hq;
            entry.hq_city = row.value.hq_city;
            entry.hq_zip = row.value.hq_zip;
            entry.hq_street = row.value.hq_street;
            entry.hq_number = row.value.hq_number;

            entry.sites = new XML('<sites/>');

            entry.sites.site[0] = new XML('<site/>');
            entry.sites.site[0].city = row.value.site1_city;
            entry.sites.site[0].zip = row.value.site1_zip;
            entry.sites.site[0].street = row.value.site1_street;
            entry.sites.site[0].number = row.value.site1_number;

            entry.sites.site[1] = new XML('<site/>');
            entry.sites.site[1].city = row.value.site2_city;
            entry.sites.site[1].zip = row.value.site2_zip;
            entry.sites.site[1].street = row.value.site2_street;
            entry.sites.site[1].number = row.value.site2_number;

            entry.address = row.value.address;
            entry.address_city = row.value.address_city;
            entry.address_zip = row.value.address_zip;
            entry.address_street = row.value.address_street;
            entry.address_number = row.value.address_number;
            entry.mobile = row.value.mobile;
            entry.phone = row.value.phone;
            entry.fax = row.value.fax;
            entry.email = row.value.email;
            entry.web = row.value.web;
            entry.contact = row.value.contact;
            entry.category = row.value.category;
            entry.subcategory = row.value.subcategory;
            entry.username = row.value.username;
            entry.password = row.value.password;
            entry.status = row.value.status;
            entry.expirationDate = row.value.expirationDate;
            entry.attachments = row.value.attachments;
            entry.images = row.value.images;
            entry.docs = row.value.docs;
            entry.description = row.value.description;

            send( entry );
        }
        return "</users>";
    })

}