export const setNodeStateAttr = (state, s, cfg) => {
    if (cfg.config.styleConfig[state]) {
        Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
            s.attr(k, v)
        })
    }
}

// const mapNodeStateAttr = (state, s, cfg, isMap) => {
//   if (cfg.config.styleConfig[state]) {
//   Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
//     s.attr(k, v)
//   })
// }
// }

export const isEng = (str) => {
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        if (charCode < 0 || charCode > 128) {
            return false
        }
    }
    return true

}

export const getSplitStrings = (str: string) => {
    if (isEng(str)) return getEngGroup(str)
    const reg = /.{5}/g
    const rs = str.match(reg) || [str]
    rs.push(str.substring(rs.join('').length))
    return rs
}

export const getEngGroup = (str: string) => {
    const strs = str.replace(/(?<!^)([A-Z])/g, `-$1`)
    return strs.split('-')
}

export const getLen = (str: string) => {
    /// <summary>获得字符串实际长度，中文2，英文1</summary>
    /// <param name="str">要获得长度的字符串</param>
    // tslint:disable-next-line: one-variable-per-declaration
    let realLength = 0,
        len = str.length,
        charCode = -1

    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1; else realLength += 2
    }

    return realLength
} // tslint:disable-next-line: interface-over-type-literal

export const getTopAnch = (num, y = 0) => {
    let res = []
    for (let i = 0; i < num; i++) {
        res.push([(i + 1) / num, y])

    }
    return res
}

export const getBottomAnch = (num, y = 1) => {
    let res = []
    for (let i = 0; i <= num; i++) {
        res.push([(i) / num, y])

    }
    return res
}

export const getLeftAnch = (num, x = 0) => {
    let res = []
    for (let i = 0; i < num; i++) {
        res.push([x, (i + 1) / num])

    }
    return res
}

export const getRightAnch = (num, x = 1) => {
    let res = []
    for (let i = 0; i <= num; i++) {
        res.push([x, (i) / num])

    }
    return res
}

export const getLength  = (length) => {
    return length >= 8 ? length : 8
   }