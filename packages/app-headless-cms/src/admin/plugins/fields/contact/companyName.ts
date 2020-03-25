import textFieldPlugin from "./../text";
import {FbBuilderFieldPlugin} from "@webiny/app-headless-cms/types";

const plugin: FbBuilderFieldPlugin = {
    type: "content-model-editor-field-type",
    name: "content-model-editor-field-type-company-name",
    field: {
        ...textFieldPlugin.field,
        unique: true,
        group: "content-model-editor-field-group-contact",
        name: "companyName",
        label: "Company name",
        createField(props) {
            const { i18n } = props;
            return {
                ...textFieldPlugin.field.createField(props),
                name: this.name,
                fieldId: "companyName",
                label: {
                    values: [
                        {
                            locale: i18n.getDefaultLocale().id,
                            value: "Company name"
                        }
                    ]
                }
            };
        }
    }
};

export default plugin;
