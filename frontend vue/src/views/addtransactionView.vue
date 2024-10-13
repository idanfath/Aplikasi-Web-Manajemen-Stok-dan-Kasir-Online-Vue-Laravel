<template>
    <Toolbar>
        <template #start>
            <Button label="View History" icon="pi pi-history" size="small"
                @click="confirmSwitchPage('transaction', $event)" />
        </template>
        <template #end>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <InputText placeholder="Search Item" size="small" v-model="search" />
            </InputGroup>
        </template>
    </Toolbar>

    <div class="card mt-3">
        <Stepper value="1" linear>
            <StepItem value="1">
                <Step>Select Items</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col">
                        <div v-if="items.length !== 0">
                            <p class="text-xl font-semibold my-2">Add Item</p>
                            <DataTable stripedRows showGridlines :value="items.data" class="p-datatable-sm ">
                                <Column field="name" header="Name" />
                                <Column field="sku" header="SKU" />
                                <Column field="stock" header="Stock" />
                                <Column field="price" header="Price">
                                    <template #body="slotProps">
                                        <div class="text-nowrap">
                                            {{ Intl.NumberFormat('id-ID', {
                                                style: 'currency', currency: 'IDR'
                                            }).format(slotProps.data.price) }}
                                        </div>
                                    </template>
                                </Column>
                                <Column header="Action">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-plus"
                                            :disabled="selected_items.some((item) => item.id === slotProps.data.id) || slotProps.data.stock < 1"
                                            @click="selected_items.push({ ...slotProps.data, amount: 1 })" />
                                    </template>
                                </Column>
                                <template #empty>
                                    <div class="center h-40">Item not found.</div>
                                </template>
                            </DataTable>
                        </div>

                        <div v-if="selected_items.length < 1" class="flex justify-center items-center h-48">
                            <div class="text-center">
                                <p class="text-lg font-semibold">No Items</p>
                                <p class="text-sm">Please add some items first</p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-xl font-semibold mt-4 mb-2">Selected Items</p>
                            <DataTable stripedRows showGridlines :value="selected_items" class="p-datatable-sm">
                                <Column field="name" header="Name" />
                                <Column field="amount" header="Amount">
                                    <template #body="slotProps">
                                        <div class="w-fit">
                                            <InputNumber type="number" v-model="slotProps.data.amount" :min="1"
                                                :max="slotProps.data.stock" showButtons :step="1"
                                                :suffix="` / ${slotProps.data.stock}`" />
                                        </div>
                                    </template>
                                </Column>
                                <Column header="Subotal">
                                    <template #body="slotProps">
                                        <div>
                                            {{ Intl.NumberFormat('id-ID', {
                                                style: 'currency', currency: 'IDR'
                                            }).format(slotProps.data.amount *
                                                slotProps.data.price) }}
                                        </div>
                                    </template>
                                </Column>
                                <Column header="Action">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-trash"
                                            @click="selected_items = selected_items.filter((item) => item.id !== slotProps.data.id)" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                    <div class="py-6">
                        <Button size="small" :disabled="selected_items.length < 1" label="Next" @click="(e) => {
                            activateCallback('2');
                            this.paidAmount = Math.ceil(this.totalSum / 1000) * 1000;
                        }" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="2">
                <Step>Transaction</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col  gap-1.5">
                        <div class="max-w-[400px] py-3 px-5 border-2  rounded bg-surface-50 dark:bg-surface-950">

                            <div class="flex  justify-between ">
                                <div class="font-semibold">{{ couponApplied ? 'Subtotal' : 'Total' }}</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(totalSum) }}</div>
                            </div>
                            <div v-if="couponApplied" class="flex  justify-between ">
                                <div class="font-semibold">Discount</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(discount) }}</div>
                            </div>
                            <div v-if="couponApplied" class="flex justify-between ">
                                <div class="font-semibold">Total</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(totalSum - discount) }}</div>
                            </div>

                            <div class="flex  justify-between ">
                                <div class="font-semibold">Cashier</div>
                                <div>{{ authStore.getUser.username }}</div>
                            </div>

                        </div>
                        <Fieldset legend="Items" :toggleable="true">
                            <DataTable stripedRows showGridlines :value="selected_items" size="small" class="mt-2">
                                <Column field="name" header="Name">
                                    <template #body="slotProps">
                                        <div class="text-nowrap">
                                            {{ slotProps.data.name }}
                                        </div>
                                    </template>
                                </Column>
                                <Column field="amount" header="Amount" />
                                <Column field="price" header="Price">
                                    <template #body="slotProps">
                                        <div class="text-nowrap">
                                            {{ Intl.NumberFormat('id-ID', {
                                                style: 'currency', currency: 'IDR'
                                            }).format(slotProps.data.price) }}
                                        </div>
                                    </template>
                                </Column>
                                <Column field="total" header="Total">
                                    <template #body="slotProps">
                                        <div class="text-nowrap">
                                            {{ Intl.NumberFormat('id-ID', {
                                                style: 'currency', currency: 'IDR'
                                            }).format(slotProps.data.amount * slotProps.data.price) }}
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </Fieldset>
                        <p class="font-semibold">Paid Amount</p>
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-money-bill" />
                            </InputGroupAddon>
                            <InputNumber v-model="paidAmount" mode="currency" currency="IDR" locale="id-ID" showButtons
                                buttonLayout="horizontal" :step="1000" :min="totalSum" placeholder="Paid Amount" />
                        </InputGroup>
                        <p class="font-semibold">Coupon</p>
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-tag" />
                            </InputGroupAddon>
                            <InputGroupAddon v-if="!couponApplied"
                                :class="couponApplied ? 'disabled' : 'cursor-pointer group hover:bg-green-50 transition-all duration-300'"
                                @click="tryApply">
                                <p class="group-hover:text-primary-500 group-hover:underline">Apply</p>
                            </InputGroupAddon>
                            <InputGroupAddon v-else
                                class="cursor-pointer group hover:bg-green-50 transition-all duration-300"
                                @click="removeCoupon">
                                <p class="group-hover:text-primary-500 group-hover:underline">Remove</p>
                            </InputGroupAddon>
                            <InputText :disabled="couponApplied" placeholder="Coupon Code" v-model="coupon" />
                        </InputGroup>
                        <div class="py-3 px-5 border-2 flex flex-col gap-2  rounded bg-surface-50 dark:bg-surface-950">
                            <p class="font-semibold">Increase</p>
                            <div class="flex gap-2 *:flex-1">
                                <Button v-for="amount in [5000, 10000, 15000, 20000, 50000, 100000]" :key="amount"
                                    size="small" severity="success" :label="`+ ${amount / 1000}rb`"
                                    @click="paidAmount += amount" />
                            </div>
                            <p class="font-semibold">Set</p>
                            <div class="flex gap-2 *:flex-1">
                                <Button v-for="amount in [5000, 10000, 15000, 20000, 50000, 100000]" :key="amount"
                                    size="small" severity="warn" :label="`${amount / 1000}rb`"
                                    @click="paidAmount = amount" :disabled="amount < totalSum" />
                            </div>
                            <p class="font-semibold">Decrease</p>
                            <div class="flex gap-2 *:flex-1">
                                <Button v-for="amount in [5000, 10000, 15000, 20000, 50000, 100000]" :key="amount"
                                    size="small" severity="danger" :label="`- ${amount / 1000}rb`"
                                    @click="paidAmount -= amount" :disabled="(paidAmount - amount) < totalSum" />
                            </div>
                        </div>
                    </div>
                    <div class="flex py-6 gap-2">
                        <Button size="small" label="Back" severity="secondary" @click="activateCallback('1')" />
                        <Button size="small" label="Next" :disabled="paidAmount < totalSum"
                            @click="activateCallback('3')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="3">
                <Step>Finalize</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col ">
                        <div
                            class="flex flex-col gap-2 max-w-[400px] py-3 px-5 border-2  rounded bg-surface-50 dark:bg-surface-950">
                            <div class="flex  justify-between ">
                                <div class="font-semibold">Date</div>
                                <!-- show date but no time -->
                                <div>{{
                                    new Date().toLocaleString('id-ID', { dateStyle: 'full' })
                                }}</div>
                            </div>
                            <div class="flex  justify-between ">
                                <div class="font-semibold">{{ couponApplied ? 'Subtotal' : 'Total' }}</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(totalSum) }}</div>
                            </div>
                            <div v-if="couponApplied" class="flex  justify-between ">
                                <div class="font-semibold">Discount</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(discount) }}</div>
                            </div>
                            <div v-if="couponApplied" class="flex justify-between ">
                                <div class="font-semibold">Total</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(totalSum - discount) }}</div>
                            </div>
                            <div class="flex  justify-between ">
                                <div class="font-semibold">Cashier</div>
                                <div>{{ authStore.getUser.username }}</div>
                            </div>
                            <div class="flex  justify-between ">
                                <div class="font-semibold">Paid Amount</div>
                                <div>{{ Intl.NumberFormat('id-ID', {
                                    style: 'currency', currency: 'IDR'
                                }).format(paidAmount) }}</div>
                            </div>
                            <div class="flex  justify-between ">
                                <div class="font-semibold">Change</div>
                                <div>{{ Intl.NumberFormat('id-ID',
                                    {
                                        style: 'currency', currency: 'IDR'
                                    }).format(Math.floor((paidAmount - (totalSum - discount)) / 100) * 100) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex py-6 gap-2">
                        <Button size="small" label="Back" severity="secondary" @click="activateCallback('2')" />
                        <Button size="small" label="Next" @click="finishTransaction(activateCallback, $event)" />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
    </div>
</template>
<script>
import { upconfirm } from '@/modules/core';
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'addtransaction',
    data() {
        return {
            authStore: useAuthStore(),
            search: '',
            items: [],
            selected_items: [],
            paidAmount: 0,
            coupon: '',
            discount: 0,
            couponApplied: false,
        }
    },
    computed: {
        totalSum() {
            return this.selected_items.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
        },
        currentDate() {
            return new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
        }
    },
    methods: {
        removeCoupon() {
            this.couponApplied = false;
            this.discount = 0;
        },
        tryApply() {
            if (!this.coupon) return;
            axios.get(`/coupon/check`, {
                params: {
                    code: this.coupon,
                    items: this.selected_items,
                    paid: this.paidAmount,
                }
            }).then((response) => {
                this.couponApplied = true;
                this.discount = response.data.discount;
            }).catch((er) => {
                try {
                    uptoast(this.$toast, 'error', er.response.data.message, er.response.data.summary);
                } catch (error) {
                    uptoast(this.$toast).preset('error')
                }
            });
        },
        confirmSwitchPage(page, event) {
            const redirectTo = () => {
                this.$router.push({ name: page });
            }

            if (this.selected_items.length < 1) {
                redirectTo();
                return;
            }
            upconfirm(this.$confirm, event, redirectTo);
        },

        finishTransaction(activateCallback, event) {
            const confirm = () => {
                const data = {
                    items: this.selected_items,
                    paid_amount: this.paidAmount,
                    coupon: this.couponApplied ? this.coupon : null,
                }

                axios.post('/transaction', data)
                    .then(() => {
                        this.selected_items = [];
                        this.paidAmount = 0;
                        this.search = '';
                        activateCallback('1');
                        uptoast(this.$toast).preset('success')
                    })
                    .catch((error) => {
                        uptoast(this.$toast).preset('error')
                    });
            }

            upconfirm(this.$confirm, event, confirm);
        },

        async onSearchItem(search = this.search, page = 1) {
            if (!search) {
                this.items = [];
                return;
            }
            const response = await axios.get(`/item?page=${page}&search=${search}&limit=5`)
            this.items = response.data.data
        },
    },
    watch: {
        'search': {
            handler: function (val) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.onSearchItem(val)
                }, 500);
            },
            deep: true,
        },
        'coupon': {
            handler: function (val) {
                this.coupon = val.toUpperCase()
            },
        }
    },
};
</script>
<style scoped>
.disabled {
    cursor: not-allowed;
    background-color: #e0e0e0;
    color: #9e9e9e;
}
</style>
