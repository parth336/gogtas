

$(document).ready(function() {
    $('#institute-table').DataTable( {
        "dom": '<"top"f>rt<"bottom"lp><"clear">',
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search"
        }
    } );
} );