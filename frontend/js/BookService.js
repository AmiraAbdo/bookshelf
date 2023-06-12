var BookService = {
    init: function () {
        BookService.list();
    },

    list: function () {
        var payload = UserService.parseJWT(localStorage.getItem("token"));
        $.ajax({
            url: 'book',
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            success: function (data) {
                SPApp.handleSectionVisibility("#book-list");
                var html = "";
                for (let i = 0; i < data.length; i++) {
                    html += `
                    
                    <!--krene kartica-->
                        <div class="col">
                            <div class="card shadow-sm" style="height:100%">
                                <img src="frontend/assets/tfios.jpg" ></img>
                                <div class="card-body">
                                    <h3>` + data[i].title + ` - ` + data[i].author + `</h3>
                                    <p class="card-text">
                                        `+ data[i].synopsis + `
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="BookshelfService.getBooks(` + data[i].idbookshelf + `)">
                                            View
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                $("#book-list").html(html);
                $("#book-list").data("book", data);
            }
        })
    },
}
