<template>
    <comp-crud-table ref="crudtable" :hideEdit="true" :columns="table.columns" modelPrefix="admin" model="coupon">
        <template #toolbar-start>
            <Button label="Add New" class="mr-2" icon="pi pi-tag" size="small" @click="toggleAdd" />
        </template>
        <Column field="discount_amount" header="Discount Amount">
            <template #body="slotProps">
                {{
                    slotProps.data.discount_type === 'percentage'
                        ? `${slotProps.data.discount_amount * 100}%`
                        : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
                            .format(slotProps.data.discount_amount)
                }}
            </template>
        </Column>
        <Column field="current_uses" header="Use Count">
            <template #body="slotProps">
                <div :class="!slotProps.data.max_uses || slotProps.data.max_uses > slotProps.data.current_uses ? 'status-active' : 'status-inactive'"
                    class="status ">
                    {{
                        slotProps.data.max_uses
                            ? `${slotProps.data.current_uses}/${slotProps.data.max_uses}`
                            : slotProps.data.current_uses
                    }}
                </div>
            </template>
        </Column>
        <Column field="status" header="Status">
            <template #body="slotProps">
                <div :class="slotProps.data.status ? 'status-active' : 'status-inactive'"
                    @click="toggleStatus(slotProps.data)" class="status status-clickable">
                    {{
                        slotProps.data.status ? 'Active' : 'Inactive'
                    }}
                </div>
            </template>
        </Column>
        <Column field="expires_at" header="Expiry">
            <template #body="slotProps">
                <component :is="slotProps.data.expires_at ? 'abbr' : 'div'"
                    :title="countDown(slotProps.data.expires_at)">
                    {{
                        slotProps.data.expires_at
                            ? new Date(slotProps.data.expires_at).toLocaleDateString('id-ID', {
                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })
                            : '-'
                    }}
                </component>
            </template>
        </Column>
        <template #additional-actions="{ slotProps }">
            <Button icon="pi pi-pencil" outlined severity="warn" @click="toggleEdit(slotProps.data)" />
        </template>
    </comp-crud-table>

    <comp-modal :isOpen="table.edit._editmode" title="Edit Coupon" @close="toggleEdit" useLoading @confirm="commitEdit"
        modalClass="!w-full" :disabledConfirm="v$.table.edit.edit.$invalid">
        <form @submit.prevent class="space-y-3">
            <p class="text-xl font-semibold">Name</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-tag" />
                </InputGroupAddon>
                <InputText v-model="table.edit.edit.name" placeholder="Coupon Name (optional)" />
            </InputGroup>

            <p class="text-xl font-semibold">Code</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-tag" />
                </InputGroupAddon>
                <InputGroupAddon class="cursor-pointer group" @click.prevent="table.edit.edit.code = randomizeCode()">
                    <Dices
                        class="text-slate-400 size-5 opacity-85 group-hover:text-green-500 transition-all duration-300 ease-in-out" />
                </InputGroupAddon>
                <InputText v-model="table.edit.edit.code" placeholder="Coupon Code (optional)" />
            </InputGroup>

            <p for="minimum_price" class="text-xl font-semibold">Minimum Purchase</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-money-bill" />
                </InputGroupAddon>
                <InputNumber id="minimum_price" v-model="table.edit.edit.minimum_price" :min="0" mode="currency"
                    currency="IDR" buttonLayout="horizontal" showButtons locale="id-ID" :step="1000" />
            </InputGroup>

            <p class="text-xl font-semibold">Expiry Type</p>
            <div class="w-full flex justify-center">
                <SelectButton v-model="table.edit.edit.expiry_type" :options="options.expiry_type" @change="() => {
                    if (this.table.edit.edit.expiry_type === 'time') {
                        this.table.edit.edit.expires_at = this.table.edit.edit.expires_at || new Date(new Date().setMonth(new Date().getMonth() + 1))
                    }
                }" :allowEmpty="false" />
            </div>

            <div v-if="table.edit.edit.expiry_type === 'time'" class="space-y-3">
                <p class="text-xl font-semibold">Expires At <abbr :title="countDown(table.edit.edit.expires_at)"
                        class="ml-2 pi pi-question-circle" /></p>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-calendar" />
                    </InputGroupAddon>
                    <DatePicker showTime v-model="table.edit.edit.expires_at" showIcon />
                </InputGroup>
            </div>

            <div v-else class="space-y-3">
                <p class="text-xl font-semibold">Max Uses</p>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-users" />
                    </InputGroupAddon>
                    <InputNumber v-model="table.edit.edit.max_uses" :min="0" showButtons buttonLayout="horizontal"
                        :step="5" />
                </InputGroup>
            </div>

            <p class="text-xl font-semibold">Discount Type</p>
            <div class="w-full flex justify-center">
                <SelectButton v-model="table.edit.edit.discount_type" @change="() => {
                    this.table.edit.edit.discount_amount = this.table.edit.edit.discount_type === 'percentage' ? 5 : 2000
                }" :options="options.discount_type" :allowEmpty="false" />
            </div>

            <p class="text-xl font-semibold">Discount Amount</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi "
                        :class="table.edit.edit.discount_type === 'percentage' ? 'pi-percentage' : 'pi-money-bill'" />
                </InputGroupAddon>
                <InputNumber v-model="table.edit.edit.discount_amount"
                    :suffix="table.edit.edit.discount_type === 'percentage' ? '%' : ''"
                    :step="table.edit.edit.discount_type === 'percentage' ? 5 : 1000" showButtons
                    buttonLayout="horizontal" :min="table.edit.edit.discount_type === 'percentage' ? 5 : 2000"
                    :max="table.edit.edit.discount_type === 'percentage' ? 100 : null" locale="id-ID" currency="IDR"
                    :mode="table.edit.edit.discount_type === 'percentage' ? 'decimal' : 'currency'" />
            </InputGroup>

            <div class="space-y-3" v-if="table.edit.edit.discount_type === 'percentage'">
                <p class="text-xl font-semibold">Max Discount</p>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-money-bill" />
                    </InputGroupAddon>
                    <InputNumber v-model="table.edit.edit.max_discount" :min="0" mode="currency" currency="IDR"
                        locale="id-ID" :step="5000" buttonLayout="horizontal" showButtons />
                </InputGroup>
            </div>

            <p class="text-xl font-semibold">Enable Coupon Directly</p>
            <div class="w-full flex justify-center">
                <SelectButton v-model="table.edit.edit.status" :options="options.status" :allowEmpty="false"
                    optionLabel="label" optionValue="value" />
            </div>
        </form>
    </comp-modal>
    <comp-modal :isOpen="modal.add" title="Add New Coupon" @close="toggleAdd" useLoading @confirm="onSubmit"
        modalClass="!w-full" :disabledConfirm="v$.form.$invalid">
        <form @submit.prevent class="space-y-3">
            <p class="text-xl font-semibold">Name</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-tag" />
                </InputGroupAddon>
                <InputText v-model="form.name" placeholder="Coupon Name (optional)" />
            </InputGroup>

            <p class="text-xl font-semibold">Code</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-tag" />
                </InputGroupAddon>
                <InputGroupAddon class="cursor-pointer group" @click.prevent="form.code = randomizeCode()">
                    <Dices
                        class="text-slate-400 size-5 opacity-85 group-hover:text-green-500 transition-all duration-300 ease-in-out" />
                </InputGroupAddon>
                <InputText v-model="form.code" placeholder="Coupon Code (optional)" />
            </InputGroup>

            <p for="minimum_price" class="text-xl font-semibold">Minimum Purchase</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-money-bill" />
                </InputGroupAddon>
                <InputNumber id="minimum_price" v-model="form.minimum_price" :min="0" mode="currency" currency="IDR"
                    buttonLayout="horizontal" showButtons locale="id-ID" :step="1000" />
            </InputGroup>

            <p class="text-xl font-semibold">Expiry Type</p>
            <div class="w-full flex justify-center">
                <SelectButton v-model="form.expiry_type" :options="options.expiry_type" :allowEmpty="false" @change="() => {
                    if (this.table.edit.edit.expiry_type === 'time') {
                        this.table.edit.edit.expires_at = this.table.edit.edit.expires_at || new Date(new Date().setMonth(new Date().getMonth() + 1))
                    }
                }" />
            </div>

            <div v-if="form.expiry_type === 'time'" class=" space-y-3">
                <p class="text-xl font-semibold">Expires At <abbr :title="countDown(form.expires_at)"
                        class="ml-2 pi pi-question-circle" /></p>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-calendar" />
                    </InputGroupAddon>
                    <DatePicker showTime v-model="form.expires_at" showIcon />
                </InputGroup>
            </div>

            <div v-else class="space-y-3">
                <p class="text-xl font-semibold">Max Uses</p>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-users" />
                    </InputGroupAddon>
                    <InputNumber v-model="form.max_uses" :min="0" showButtons buttonLayout="horizontal" :step="5" />
                </InputGroup>
            </div>

            <p class="text-xl font-semibold">Discount Type</p>
            <div class="w-full flex justify-center">
                <SelectButton v-model="form.discount_type" @change="() => {
                    this.form.discount_amount = this.form.discount_type === 'percentage' ? 5 : 2000
                }" :options="options.discount_type" :allowEmpty="false" />
            </div>

            <p class="text-xl font-semibold">Discount Amount</p>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi " :class="form.discount_type === 'percentage' ? 'pi-percentage' : 'pi-money-bill'" />
                </InputGroupAddon>
                <InputNumber v-model="form.discount_amount" :suffix="form.discount_type === 'percentage' ? '%' : ''"
                    :step="form.discount_type === 'percentage' ? 5 : 1000" showButtons buttonLayout="horizontal"
                    :min="form.discount_type === 'percentage' ? 5 : 2000"
                    :max="form.discount_type === 'percentage' ? 100 : null" locale="id-ID" currency="IDR"
                    :mode="form.discount_type === 'percentage' ? 'decimal' : 'currency'" />
            </InputGroup>

            <div class="space-y-3" v-if="form.discount_type === 'percentage'">
                <p class="text-xl font-semibold">Max Discount</p>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-money-bill" />
                    </InputGroupAddon>
                    <InputNumber v-model="form.max_discount" :min="0" mode="currency" currency="IDR" locale="id-ID"
                        :step="5000" buttonLayout="horizontal" showButtons />
                </InputGroup>
            </div>

            <p class="text-xl font-semibold">Enable Coupon Directly</p>
            <div class="w-full flex justify-center">
                <SelectButton v-model="form.status" :options="options.status" :allowEmpty="false" optionLabel="label"
                    optionValue="value" />
            </div>
        </form>
    </comp-modal>
</template>
<script>
import cryptoJs from 'crypto-js';
import { Dices } from 'lucide-vue-next';

export default {
    components: {
        Dices
    },
    data() {
        return {
            table: {
                edit: {
                    _editmode: false,
                    edit: {},
                },
                columns: [
                    { field: 'name', header: 'Name' },
                    { field: 'code', header: 'Code' },
                    { field: 'minimum_price', header: 'Minimum Price', currency: true },
                    { field: 'max_discount', header: 'Max Discount', currency: true, null: '-' }
                ]
            },
            modal: {
                add: false
            },
            form: {
                name: '',
                status: true,
                code: '',
                expiry_type: 'time',
                expires_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                max_uses: 0,
                discount_type: 'percentage',
                minimum_price: 0,
                discount_amount: 5,
                max_discount: 5000,
            },
            options: {
                expiry_type: ['time', 'uses'],
                discount_type: ['percentage', 'nominal'],
                status: [{ label: 'Active', value: true }, { label: 'Inactive', value: false }]
            },
            reset: {},
            v$: useVuelidate()
        }
    },
    validations() {
        return {
            form: {
                expiry_type: { required },
                expires_at: { requiredIf: requiredIf(this.form.expiry_type, 'time') },
                max_uses: { requiredIf: requiredIf(this.form.expiry_type, 'uses') },
                discount_type: { required },
                minimum_price: { required, numeric },
                discount_amount: { required, numeric },
                max_discount: { requiredIf: requiredIf(this.form.discount_type, 'percentage'), numeric },
                status: { required }
            },
            table: {
                edit: {
                    edit: {
                        status: { required },
                        code: { required },
                        expiry_type: { required },
                        discount_type: { required },
                        minimum_price: { required, numeric },
                        discount_amount: { required, numeric },
                    }
                }
            }
        }
    },
    computed: {
        countDown() {
            return (date) => {
                if (!date) return 'No expiry date'
                const now = new Date()
                const expires = new Date(date)
                const diff = expires - now
                if (diff < 0) return 'Expired'
                const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                return `${days} days ${hours} hours ${minutes} minutes`
            }
        }
    },
    mounted() {
        this.v$.$touch();
        this.reset = { ...this.form };
    },
    methods: {
        toggleAdd() {
            this.form = { ...this.reset }
            this.modal.add = !this.modal.add
        },
        toggleEdit(data) {
            if (data) {
                let editData = { ...data }
                editData.expires_at = editData.expires_at ? new Date(editData.expires_at) : new Date(new Date().setMonth(new Date().getMonth() + 1))
                editData.discount_amount = editData.discount_type === 'percentage' ? editData.discount_amount * 100 : parseInt(editData.discount_amount)
                editData.max_discount = editData.discount_type === 'percentage' ? parseInt(editData.max_discount) : 0
                editData.max_uses = editData.max_uses || parseInt(editData.max_uses) || 0
                editData.minimum_price = parseInt(editData.minimum_price)
                this.table.edit._editmode = true
                this.table.edit.edit = editData
                return
            }
            this.table.edit.edit = {}
            this.table.edit._editmode = false
        },
        commitEdit() {
            if (!this.table.edit.edit.name) delete this.table.edit.edit.name
            this.table.edit.edit.code = this.table.edit.edit.code || this.randomizeCode()

            console.log(this.table.edit.edit)

            axios.put(`admin/coupon/${this.table.edit.edit.id}`, this.table.edit.edit).then((res) => {
                uptoast(this.$toast).preset('success')
                this.table.edit._editmode = false
                this.$refs.crudtable.onLoad()
            }).catch((er) => {
                console.log(er)
                try {
                    uptoast(this.$toast, 'error', er.response.data.message)
                } catch (error) {
                    console.log(error)
                    uptoast(this.$toast).preset('error')
                }
            })
        },
        onSubmit(resolveLoading) {
            this.form.code = this.form.code || this.randomizeCode()
            if (!this.form.name) delete this.form.name

            axios.post('admin/coupon', this.form).then((res) => {
                uptoast(this.$toast).preset('success')
                this.form = { ...this.reset }
                this.$refs.crudtable.onLoad()
            }).catch((er) => {
                console.log(er)
                try {
                    uptoast(this.$toast, 'error', er.response.data.message)
                } catch (error) {
                    console.log(error)
                    uptoast(this.$toast).preset('error')
                }
            }).finally(() => {
                resolveLoading()
            })
        },
        randomizeCode() {
            return cryptoJs.MD5(`${new Date().toISOString().replace(/[^0-9]/g, '')} ${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`).toString().substring(0, 8).toUpperCase()
        },
        toggleStatus(data) {
            const original = data.status
            data.status = !data.status
            clearTimeout(this.toggleStatusTimeout)
            this.toggleStatusTimeout = setTimeout(() => {
                axios.put(`admin/coupon/toggle/${data.id}`,
                    { status: data.status }
                ).then((res) => {
                    data.status = res.data.data
                }).catch((err) => {
                    uptoast(this.$toast).preset('error')
                    data.status = original
                })
            }, 300);
        }
    },
    watch: {
        'form.code': {
            handler: function (val) {
                this.form.code = val.toUpperCase()
            },
        }
    },
};
</script>
<style scoped>
.status-active {
    @apply bg-green-500;
}

.status-inactive {
    @apply bg-red-500;
}

.status {
    @apply text-white rounded-md px-2 py-1 text-center
}

.status-clickable {
    @apply cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border-[1.5px] border-transparent hover:border-white;
}
</style>
