$(document).ready(function() {
    let formSchema = {};

    $.getJSON("formStructure.json", function(data) {
        formSchema = data;
        let formHtml = '';

        data.fields.forEach(field => {
            let fieldHtml = `<div class="form-group ${field.dependsOn ? 'hidden' : ''}" id="group-${field.id}">
                                <label>${field.label}</label>`;
            
            if (field.type === "select") {
                fieldHtml += `<select id="${field.id}" name="${field.id}">`;
                field.options.forEach(opt => {
                    fieldHtml += `<option value="${opt}">${opt}</option>`;
                });
                fieldHtml += `</select>`;
            } else {
                fieldHtml += `<input type="${field.type}" id="${field.id}" placeholder="Enter ${field.label}">`;
            }

            fieldHtml += `<span class="error-msg" id="error-${field.id}">Required field</span></div>`;
            formHtml += fieldHtml;
        });

        $('#formFields').html(formHtml);
    });

    $(document).on('change', '#country', function() {
        const country = $(this).val();
        const stateGroup = $('#group-state');
        const stateSelect = $('#state');

        if (country !== "Select Country" && formSchema.stateMap[country]) {
            stateSelect.html('<option value="Select State">Select State</option>');
            
            formSchema.stateMap[country].forEach(state => {
                stateSelect.append(`<option value="${state}">${state}</option>`);
            });

            stateGroup.fadeIn().css("display", "flex").removeClass('hidden');
        } else {
            stateGroup.fadeOut().addClass('hidden');
            stateSelect.val("Select State");
        }
    });

    $('#dynamicForm').on('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        $('.error-msg').hide();

        formSchema.fields.forEach(field => {
            const $field = $(`#${field.id}`);
            const $group = $(`#group-${field.id}`);
            const val = $field.val();

            if (field.required && !$group.hasClass('hidden')) {
                if (!val || val === "Select Country" || val === "Select State" || val.trim() === "") {
                    $(`#error-${field.id}`).text(`${field.label} is required`).show();
                    isValid = false;
                }
            }
        });

        if (isValid) {
            alert("Registration Successful!");
        }
    });
});