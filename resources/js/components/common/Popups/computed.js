export default {
    create: {
        show: ({ dialogs }) => dialogs.create.visible,
        params: ({ dialogs }) => dialogs.create.params,
        date: ({ dialogs }) => dialogs.create.params.date,
        notes: ({ dialogs }) => dialogs.create.params.notes
    },
    edit: {
        show: ({ dialogs }) => dialogs.edit.visible,
    }
}