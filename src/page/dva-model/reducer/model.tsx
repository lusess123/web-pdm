export const layouting = (sss, arg) => {
  return { ...sss, layouting: arg.layouting }
}

export const setArrangeLayout = (sss, { isArrangeLayout }) => {
  return { ...sss, isArrangeLayout }
}

export const openInsertModel = (ss) => {
  return { ...ss, showInsertModel: 'new' }
}
export const centerModel = (ss, { model }) => {

  if (!ss.checkedKeys.find((a) => a === model)) {
    return { ...ss, currentModel: model, checkedKeys : [...ss.checkedKeys, model ], centerModel: model }
  } else {
  // alert(model)
    return { ...ss, currentModel: model , centerModel: model }
  }
}
export const currentModel = (ss, { model }) => {
  //  return ss
  //  alert(JSON.stringify(ss.checkedKeys))
   if (!ss.checkedKeys.find((a) => a === model)) {
    return { ...ss, currentModel: model, checkedKeys : [...ss.checkedKeys, model ] }
  } else {
    // alert(model)
    return { ...ss, currentModel: model }
  }
}
export const closeModel = (ss) => {
  return { ...ss, showModel: null }
}

export const delModel = (ss, { model }) => {
  // alert(model)
  // if( model === ss.currentModel) {
  //   return {  ...ss    }
  // }
  // return { ...ss, showModel: null }

  const models = ss.models.filter((a) =>  (('model-' + a.key) !== model))
  return {  ...ss , models , checkedKeys : ss.checkedKeys.filter((a) => a !== model), currentModel : undefined}

}

export const delModule = (ss, { model }) => {
  // alert(model)
  // if( model === ss.currentModel) {
  //   return {  ...ss    }
  // }
  // return { ...ss, showModel: null }
  const modules = ss.modules.filter((a) => ('module-' + a.key) !== model)
  const models = ss.models.filter((a) =>  (('module-' + a.moduleKey) !== model))
  return {  ...ss , models , modules,  checkedKeys : ss.checkedKeys.filter((a) => a !== model), currentModel : undefined}

}

export const closeInsertModel = (ss) => {
  return { ...ss, showInsertModel: null }
}

export const onCheck = (ss, { checkKeys }) => {
  if (checkKeys && checkKeys.find && checkKeys.find((ck) => ck === ss.currentModel)) {
    return { ...ss,
             checkedKeys: checkKeys,
             currentModel: null,
    }
  } else return { ...ss,
                  checkedKeys: checkKeys,
  }
}
export const search = (ss, { text }) => {
  return { ...ss,
           search: text,
           currentModel: null,
  }
}
