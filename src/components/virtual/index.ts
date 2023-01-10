import {ref} from 'vue'
export const virtualHandle = () => {
  const currData = ref({})
  const currIndex = ref(0)
  const refMaps = ref<Record<string,{}>>({})
  const trigger = (row:Record<string,{}>, index?:number) => {
    currData.value = row
    if(typeof index === 'number'){
      currIndex.value = index
      virtualRef.value = refMaps.value[index]
    }
  }
  const virtualRef = ref()
  return {
    currIndex,
    currData,
    trigger,
    virtualRef,
    refMaps,
  }
}
