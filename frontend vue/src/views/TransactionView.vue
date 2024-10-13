<template>
    <comp-crud-table model="transaction" :columns="columns">
        <template #toolbar-start>
            <Button label="Add New" class="mr-2" icon="pi pi-plus-circle" size="small"
                @click="$router.push({ name: 'add transaction' })" />
        </template>
        <template #additional-actions="{ slotProps }">
            <Button icon="pi pi-eye" class="p-button-outlined" severity="info"
                @click="ToggleDetailModal(slotProps.data)" />
        </template>
    </comp-crud-table>

    <comp-modal v-if="detailData" title="Details" :isOpen="isDetailVisible" @close="ToggleDetailModal" hideConfirm>
        <div class="flex flex-col gap-2">
            <div class="flex  justify-between">
                <div class="font-semibold">Invoice</div>
                <div>{{ detailData.invoice }}</div>
            </div>
            <div class="flex  justify-between">
                <div class="font-semibold">Subtotal</div>
                <div>{{
                    Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailData.subtotal) }}
                </div>
            </div>
            <div class="flex  justify-between">
                <div class="font-semibold">Discount</div>
                <div>{{
                    Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailData.discount) }}
                </div>
            </div>
            <div class="flex  justify-between">
                <div class="font-semibold">Total</div>
                <div>{{
                    Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailData.total) }}</div>
            </div>
            <div class="flex  justify-between">
                <div class="font-semibold">Paid Amount</div>
                <div>{{
                    Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailData.paid_amount) }}
                </div>
            </div>
            <div class="flex  justify-between">
                <div class="font-semibold">Change</div>
                <div>{{ Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailData.change) }}
                </div>
            </div>
            <div class="flex  justify-between">
                <div class="font-semibold">Cashier</div>
                <div>{{ detailData.user.username }}</div>
            </div>
            <div v-if="detailData.coupon" class="flex  justify-between">
                <div class="font-semibold">Coupon</div>
                <div>{{ detailData.coupon.code || '-' }}</div>
            </div>
            <div class="flex ">
                <div class="font-semibold">Items</div>
            </div>
            <DataTable :value="detailData.items" class="p-datatable-sm ">
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
                            }).format(slotProps.data.price * slotProps.data.amount) }}
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </comp-modal>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                { field: 'user.username', header: 'Cashier' },
                { field: 'subtotal', header: 'Subotal', currency: true },
                { field: 'total', header: 'Total', currency: true },
                { field: 'discount', header: 'Discount', currency: true },
                { field: 'paid_amount', header: 'Paid Amount', currency: true },
                { field: 'change', header: 'Change', currency: true },
            ],
            isDetailVisible: false,
            detailData: {},
        }
    },
    computed: {
    },
    methods: {
        ToggleDetailModal(data) {
            if (data) {
                this.detailData = data
                this.isDetailVisible = true
                return
            }
            this.detailData = {}
            this.isDetailVisible = false
        },
    }
}
</script>
