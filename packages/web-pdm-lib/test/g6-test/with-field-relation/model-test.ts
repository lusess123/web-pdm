export default [
    {
        name: 'bd_Quota_Apply',
        label: '额度申请',
        module: 'finance',
        fields: [
            {
                name: 'FlowNumber',
                label: '流水号',
                typeMeta:
                {
                    relationModel: 'bd_PayInfo',
                    field: 'FlowNumber2',
                    type: 'Relation'
                }

            },
            {
                name: 'AcceptBank',
                label: '承兑行'
            },
            {
                name: 'Amount',
                label: '金额',
                typeMeta: [
                    {
                        relationModel: 'bd_PayInfo',
                        field: 'FID',
                        type: 'Relation'
                    },
                    {
                        relationModel: 'bd_PayInfo',
                        field: 'FlowNumber2',
                        type: 'Relation'
                    }
                ]
            }
        ]
    },
    {
        name: 'bd_PayInfo',
        label: '打款信息',
        module: 'finance',
        fields: [
            {
                name: 'FID',
                label: 'FID'
            },
            {
                name: 'FlowNumber',
                label: '流水号'
            },
            {
                name: 'FlowNumber2',
                label: '流水号'
            },
            {
                name: 'FlowNumber3',
                label: '流水号'
            }
        ]
    }
]
