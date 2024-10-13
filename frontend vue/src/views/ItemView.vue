<template>
    <comp-crud-table ref="crudTable" model="item" :columns="columns" :hideEdit="false">
        <template #toolbar-start>
            <Button label="Add New" class="mr-2" icon="pi pi-plus-circle" size="small" @click="toggleAdd" />
        </template>
        <template #edit-modal="{ data }">
            <div class="flex flex-col gap-2">
                <div class="space-y-2">
                    <label for="name" class="text-xl font-semibold">Name</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-tag" />
                        </InputGroupAddon>
                        <InputText id="name" v-model="data.name" />
                    </InputGroup>
                </div>
                <div class="space-y-2">
                    <label for="stock" class="text-xl font-semibold">Stock</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-shopping-cart" />
                        </InputGroupAddon>
                        <InputNumber id="stock" v-model="data.stock" suffix=" pcs" showButtons
                            buttonLayout="horizontal" />
                    </InputGroup>
                </div>
                <div class="space-y-2">
                    <label for="sku" class="text-xl font-semibold">SKU</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-barcode" />
                        </InputGroupAddon>
                        <InputText id="sku" v-model="data.sku" />
                    </InputGroup>
                </div>
                <div class="space-y-2">
                    <label for="price" class="text-xl font-semibold">Price</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-money-bill" />
                        </InputGroupAddon>
                        <InputNumber id="price" v-model="data.price" :min="1000" :step="1000" mode="currency"
                            currency="IDR" locale="id-ID" showButtons buttonLayout="horizontal" />
                    </InputGroup>
                </div>
            </div>
        </template>
    </comp-crud-table>

    <comp-modal :isOpen="modal.add" @close="toggleAdd" modalClass="!w-full" @confirm="confirmSubmit"
        :disabledConfirm="sku_taken || isLoading || v$.$invalid">
        <div class="space-y-2">
            <div class="space-y-1">
                <label for="name" class="text-xl font-semibold">Name</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-tag" />
                    </InputGroupAddon>
                    <InputText id="name" fluid v-model="form.name" placeholder="Product name" />
                </InputGroup>
            </div>
            <div class="space-y-1">
                <label for="stock" class="text-xl font-semibold">Stock</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-shopping-cart" />
                    </InputGroupAddon>
                    <InputNumber fluid v-model="form.stock" id="amount" showButtons buttonLayout="horizontal" :min="1"
                        suffix=" pcs" />
                </InputGroup>
            </div>
            <div class="space-y-1">
                <label for="sku" class="text-xl font-semibold">SKU</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-barcode" />
                    </InputGroupAddon>
                    <InputText fluid v-model="form.sku" id="sku" :placeholder="slugify(form.name) || 'Product SKU'" />

                </InputGroup>
            </div>
            <div v-if="sku_taken" class="text-red-500 text-sm">SKU already taken</div>
            <div class="space-y-1">
                <label for="price" class="text-xl font-semibold">Price</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-money-bill" />
                    </InputGroupAddon>
                    <InputNumber id="price" v-model="form.price" :min="1000" :step="1000" mode="currency" currency="IDR"
                        locale="id-ID" showButtons buttonLayout="horizontal" />
                </InputGroup>
            </div>
        </div>
    </comp-modal>
</template>

<script>
export default {
    data() {
        return {
            modal: {
                add: false
            },
            columns: [
                { field: 'name', header: 'Nama' },
                { field: 'stock', header: 'Stock' },
                { field: 'sku', header: 'SKU' },
                { field: 'price', header: 'Harga', currency: true },
            ],
            form: {
                name: '',
                price: 1000,
                stock: 1,
                sku: '',
            },
            v$: useVuelidate(),
            sku_taken: false,
            isLoading: false,
        }
    },
    computed: {
        slugify() {
            return (text) => {
                return text
                    .toString()
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]+/g, '')
                    .replace(/--+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '')
            }
        },
    },
    methods: {
        toggleAdd() {
            this.modal.add = !this.modal.add
        },
        async skuCheck(sku) {
            if (sku) {
                const response = await axios.get(`/skucheck/${sku}`)
                this.sku_taken = response.data.data
                this.isLoading = false;
                return
            }
            this.sku_taken = false;
            this.isLoading = false;
        },
        onReset() {
            this.form = { ...this.reset };
            this.v$.$touch();
        },
        confirmSubmit(event) {
            const submitForm = { ...this.form };
            submitForm.sku = this.slugify(submitForm.sku) || this.slugify(submitForm.name);

            axios.post('/item', submitForm).then(() => {
                uptoast(this.$toast).preset('success')
                this.onReset();
                this.v$.$touch();
                this.$refs.crudTable.onLoad();
            }).catch(() => {
                uptoast(this.$toast).preset('error')
            }).finally(() => {
                this.isLoading = false;
            })

        },

    },
    mounted() {
        this.reset = { ...this.form };
        this.v$.$touch();
    },
    watch: {
        'form.sku': {
            handler: function (val) {
                this.isLoading = true;
                this.skuCheck(this.slugify(val));
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.skuCheck(this.slugify(val));
                }, 500);
            },
            deep: true,
        },
        'form.name': {
            handler: function (val) {
                this.isLoading = true;
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.skuCheck(this.slugify(val));
                }, 500);
            },
            deep: true,
        },
    },
    validations() {
        return {
            form: {
                name: { required },
                price: { required, numeric },
                stock: { required, numeric, minValue: minValue(1) },
            }
        }
    },

}
</script>
