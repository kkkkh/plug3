<template>
    <virtual-dropdown :virtual-ref="virtualRef" :attrs="attrs">
        <template #dropdownItem>
            <slot name="dropdownItem" />
        </template>
        <virtual-dropdown-item @click="handleCommand({ behavior: 'forceCheckin' })">
            强制签入
        </virtual-dropdown-item>
        <virtual-dropdown-item :disabled="true" @click="handleCommand({ behavior: 'forceCancelCheckout' })">
            强制取消签出
        </virtual-dropdown-item>
        <virtual-dropdown-item @click="handleCommand({ behavior: 'delete' })">
            删除
        </virtual-dropdown-item>
        <virtual-dropdown-item @click="handleCommand({ behavior: 'cancelCheckout' })">
            取消签出
        </virtual-dropdown-item>
        <virtual-dropdown-item @click="handleCommand({ behavior: 'cancelDel' })">
            取消删除
        </virtual-dropdown-item>
        <template #dropItem>
            <slot name="dropItem"></slot>
        </template>
    </virtual-dropdown>
</template>
<script setup lang="ts">
import VirtualDropdown from './dropdown.vue'
import VirtualDropdownItem from './dropdownItem.vue'
const emit = defineEmits([
    'cancelDel',
    'cancelCheckout',
    'delete',
    'forceCancelCheckout',
    'forceCheckin',
])
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    },
    virtualRef: {
        type: Object,
        default: () => ({}),
    },
})

const handleCommand = (command: any) => {
    emit(command.behavior)
}
</script>
