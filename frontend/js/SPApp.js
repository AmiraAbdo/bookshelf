var SPApp = {
    handleSectionVisibility : function(spotlight_element){
        /**
         * All the elements which do not have to be in spotlight are hidden,
         * only the active section is visible
         */
        elements = ["#book-list", "#bookshelf-list", "#bookshelf-book-list", "#login", "#register", "#start", "#add-shelf", "#add-book", "#edit-shelf", "#book"];
        $(elements.join(", ")).attr('hidden', true);
        
        $(spotlight_element).attr('hidden',false);
        $(spotlight_element).html("");
    }
}