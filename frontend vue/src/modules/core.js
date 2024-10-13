
/**
 * @file core.js
 * @description This file contains core functions of helpers
 */

export const mstr = (str) => {
    return {
        capitalize: (eachword = false) => {
            if (eachword) {
                return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            } else {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')         // Replace spaces with -
                .replace(/[^\w-]+/g, '')       // Remove all non-word chars
                .replace(/--+/g, '-')          // Replace multiple - with single -
                .replace(/^-+/, '')            // Trim - from start of text
                .replace(/-+$/, '')            // Trim - from end of text
        },
    }
}


export const uptoast = (toast, severity, detail, summary = severity, life = 3000) => {
    if (!toast) return
    if (summary) summary = mstr(summary).capitalize(true)
    if (severity) {
        toast.add({ severity, summary, detail, life })
    } else {
        return {
            preset: (options) => {
                switch (options) {
                    case 'error':
                        toast.add({ severity: 'error', summary: 'Failed', detail: 'Action Failed', life })
                        break;
                    case 'cancel':
                        toast.add({ severity: 'warn', summary: 'Canceled', detail: 'Action canceled', life })
                        break;
                    case 'success':
                    default:
                        toast.add({ severity: 'success', summary: 'Success', detail: 'Action success', life })
                        break;
                }
            }
        }
    }
}

export const upconfirm = (confirm, event, acceptCallBack = (() => { }), rejectCallBack = (() => { }), header, message,) => {
    confirm.require({
        target: event.currentTarget,
        icon: 'pi pi-exclamation-triangle',
        acceptProps: { label: 'Yes', severity: 'success' },
        rejectProps: { label: 'Cancel', severity: 'danger' },
        group: window.innerWidth < 1024 ? 'dialog' : 'popup',
        header: header || 'Confirm',
        message: message || 'Are you sure?',
        accept: acceptCallBack,
        reject: rejectCallBack,
    })
}

export const coreTesting = (text) => {
    console.log(text)
}
