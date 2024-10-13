<template>
    <Toolbar class="mb-2">
        <template #start>
            <slot name="toolbar-start">
            </slot>
            <Button :label="table._select ? 'Hapus' : 'Pilih Item'" size="small"
                :disabled="table.selection.length == 0 && table._select"
                :icon="table._select ? 'pi pi-trash' : 'pi pi-check-square'" severity="danger"
                :outlined="!table._select" @click="($event) => {
                    if (this.table.selection.length > 0) {
                        const ids = this.table.selection.map((item) => item.id);
                        this.onDeleteItem(ids, $event);
                    } else {
                        this.table._select = !this.table._select;
                    }
                }" />
            <Button v-if="table._select" label="Batal" icon="pi pi-times" class="ml-2" size="small"
                @click="() => { table._select = !table._select; this.table.selection = [] }" />
        </template>
        <template #end>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <InputText placeholder="Keyword Search" v-model="table.search" />
            </InputGroup>
        </template>
    </Toolbar>
    <DataTable :value="table.fetchdata.items.data" :rows="10" v-model:selection="table.selection"
        :loading="table._fetchloading">
        <Column v-if="table._select" selectionMode="multiple" headerStyle="width: 3rem" />
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
            <template #body="slotProps">
                <div :class="col.class" v-if="col.date">
                    {{
                        new Date(slotProps.data[col.field]).toLocaleDateString('id-ID', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })
                    }}
                </div>
                <div :class="col.class" v-if="col.currency">
                    {{
                        slotProps.data[col.field] ? new Intl.NumberFormat('id-ID', {
                            style: 'currency', currency: 'IDR'
                        }).format(slotProps.data[col.field]) : col.null
                    }}
                </div>
                <div v-html="col.innerHtml" :class="col.class" v-if="col.innerHtml" />
                <div :class="col.class" v-if="!col.date && !col.currency && !col.innerHtml">
                    {{ getNestedProperty(slotProps.data, col.field) === null ? "-" : getNestedProperty(slotProps.data,
                        col.field) }}
                </div>
            </template>
        </Column>
        <slot></slot>
        <Column header="Action">
            <template #body="slotProps">
                <div class="flex gap-2">
                    <slot name="additional-actions" :slotProps="slotProps" />
                    <Button icon="pi pi-pencil" class=" p-button-outlined" severity="warn"
                        @click="toggleEditMode(slotProps.data)" v-if="!hideEdit" />
                    <Button icon="pi pi-trash" class=" p-button-outlined" severity="danger"
                        @click="onDeleteItem(slotProps.data.id, $event)" />
                </div>
            </template>
        </Column>
        <template #footer>
            <Paginator @page="(page) => { onLoad(page.page + 1) }" :rows="10"
                :totalRecords="table.fetchdata.items.total" />
        </template>
        <template #empty>
            <div class="center">Empty</div>
        </template>
    </DataTable>

    <comp-modal :isOpen="table.edit._editmode" title="Edit Data" :modalClass="modalClass" @close="toggleEditMode"
        @confirm="commitEdit">
        <slot name="edit-modal" :data="table.edit.edit">
        </slot>
    </comp-modal>
</template>
<script>
import InputGroupAddon from 'primevue/inputgroupaddon';

export default {
    name: 'crudTable',

    data() {
        return {
            table: {
                fetchdata: {
                    items: []
                },
                edit: {
                    _editmode: false,
                    edit: {},
                },
                search: '',
                selection: [],
                _fetchloading: false,
                _select: false,
            },
        }
    },
    props: {
        modalClass: {
            type: String,
            default: ''
        },
        columns: {
            type: Array,
            required: true,
            default: () => [
                { field: 'id', header: 'ID' },
            ],
        },
        model: {
            type: String,
            required: true,
        },
        hideEdit: {
            type: Boolean,
            default: true,
        },
        modelPrefix: {
            type: String,
            default: '',
        },
    },
    methods: {
        getNestedProperty(obj, path) {
            return path.split('.').reduce((o, p) => o && o[p], obj);
        },
        async onLoad(page = 1, search = this.table.search) {
            this.table._fetchloading = true
            const response = await axios.get(`${this.modelPrefix}/${this.model.toLowerCase()}?page=${page}&search=${search}`)
            console.log(response.data.data)
            this.table.fetchdata.items = response.data.data
            this.table._fetchloading = false
        },
        async onDeleteItem(ids, event) {
            ids = Array.isArray(ids) ? ids : [ids];
            const accept = async () => {
                event.target.disabled = true;
                await axios.delete(`${this.modelPrefix}/delete${mstr(this.model).capitalize()}s`, { data: { id: ids } })
                uptoast(this.$toast).preset('success')
                this.onLoad();
                event.target.disabled = false;
                this.table.selection = [];
                this.table._select = false;
            }
            const reject = () => {
                uptoast(this.$toast, 'info', 'Batal menghapus data');
            }
            upconfirm(this.$confirm, event, accept, reject);
        },
        toggleEditMode(data) {
            if (this.table.edit._editmode) {
                this.table.edit._editmode = false
                this.table.edit.edit = {}
                return
            }
            this.table.edit._editmode = true
            this.table.edit.edit = { ...data }
        },
        commitEdit() {
            axios.put(`item/${this.table.edit.edit.id}`, this.table.edit.edit).then(() => {
                this.onLoad()
                this.table.edit.edit = {}
            })
        },

    },
    mounted() {
        this.onLoad()
    },
    watch: {
        'table.search': {
            handler: function (val) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.onLoad(1, val)
                }, 500);
            },
            deep: true,
        },
    },
};
</script>
