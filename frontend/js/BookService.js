var BookService = {
    init: function () {
        BookService.list();
    },

    list: function () {
        $.get("book", function (data) {
            SPApp.handleSectionVisibility("#book-list");
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += `
                
                <!--krene kartica-->
                    <div class="col">
                        <div class="card shadow-sm" style="height:100%">
                            <img src="../bookshelf/frontend/assets/tfios.jpg" ></img>
                            <div class="card-body">
                                <h3>` + data[i].title + ` - ` + data[i].author + `</h3>
                                <p class="card-text">
                                    `+ data[i].synopsis +`
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group" style="margin-top:auto">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">
                                            View
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">
                                            Edit
                                        </button>
                                    </div>
                                    <small class="text-body-secondary">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            $("#book-list").html(html);
            $("#book-list").data("book", data);
        });
    },
}
