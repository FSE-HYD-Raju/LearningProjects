import { Service } from "../../../../../redux/types";

const services: Array<Service> = [
	{
		id: "juanita-agreement1-callfwd-cfnrcfwd",
		primaryId: "callfwd_cfnrcfwd",
		validFor: {
			startDate: "2017-07-07T00:00:00Z",
			endDate: undefined
		},
		lifeCycleStatus: "ACTIVE",
		type: "CF",
		specification: {
			name: "CFSS CFNRY FWD FollowMeEverywhere",
			id: "callfwd_spec",
			specSubType: "BLOCKING",
			specType: "SERVICE",
			instanceCharacteristics: {
				specificationSubType: {
					values: [
						{
							value: "SUPPLEMENTARY",
							name: "SUPPLEMENTARY"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Type",
					priority: undefined
				},
				specificationSubSubtype: {
					values: [
						{
							value: "CALL_FORWARDING",
							name: "CALL_FORWARDING"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Sub Type",
					priority: undefined
				},
				versionIdentifier: {
					values: [
						{
							value: "1508524615065",
							name: "1508524615065"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Version Identifier",
					priority: undefined
				},
				isComposite: {
					values: [
						{
							value: "0",
							name: "0"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Is Composite",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32M: {
					values: [
						{
							value: "Duration",
							name: "Duration"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Measure",
					priority: undefined
				},
				db36d0f15f8c27610bf6d80c9b438ed7: {
					values: [
						{
							value: "CFUFWD",
							name: "CFUFWD"
						},
						{
							value: "CFBFWD",
							name: "CFBFWD"
						},
						{
							value: "CFNRYFWD",
							name: "CFNRYFWD"
						},
						{
							value: "CFNRCFWD",
							name: "CFNRCFWD"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "SERVICEID,",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32U: {
					values: [
						{
							value: "second",
							name: "second"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Unit of Measure",
					priority: undefined
				},
				category: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Category",
					priority: undefined
				}
			},
			inputCharacteristics: {
				CFMSISDN: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: true,
					validation: "^.{1,256}$",
					name: "CFMSISDN",
					priority: undefined
				},
				CFTIME: {
					values: [
						{
							value: "5",
							name: "5"
						},
						{
							value: "25",
							name: "25"
						},
						{
							value: "20",
							name: "20"
						},
						{
							value: "15",
							name: "15"
						},
						{
							value: "10",
							name: "10"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME",
					priority: undefined
				},
				CFSTATUS: {
					values: [
						{
							value: "2",
							name: "2"
						},
						{
							value: "1",
							name: "1"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFSTATUS",
					priority: undefined
				},
				targetState: {
					values: [
						{
							value: "Inactive",
							name: "Inactive"
						},
						{
							value: "Active",
							name: "Active"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "TargetState",
					priority: undefined
				}
			},
			featureCharacteristics: []
		},
		allowedTransitions: [],
		usageCounters: [],
		characteristics: {
			CFMSISDN: "543221212",
			CFTIME: "10",
			CFSTATUS: "2",
			SERVICEID: "CFNRCFWD"
		},
		instanceCharacteristics: {}
	},
	{
		id: "juanita-agreement1-callfwd-cfufwd",
		primaryId: "callfwd_cfufwd",
		validFor: {
			startDate: "2017-07-07T00:00:00Z",
			endDate: undefined
		},
		lifeCycleStatus: "ACTIVE",
		type: "CF",
		specification: {
			name: "CFSS CFNRY FWD FollowMeEverywhere",
			id: "callfwd_spec",
			specSubType: "BLOCKING",
			specType: "SERVICE",
			instanceCharacteristics: {
				specificationSubType: {
					values: [
						{
							value: "SUPPLEMENTARY",
							name: "SUPPLEMENTARY"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Type",
					priority: undefined
				},
				specificationSubSubtype: {
					values: [
						{
							value: "CALL_FORWARDING",
							name: "CALL_FORWARDING"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Sub Type",
					priority: undefined
				},
				versionIdentifier: {
					values: [
						{
							value: "1508524615065",
							name: "1508524615065"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Version Identifier",
					priority: undefined
				},
				isComposite: {
					values: [
						{
							value: "0",
							name: "0"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Is Composite",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32M: {
					values: [
						{
							value: "Duration",
							name: "Duration"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Measure",
					priority: undefined
				},
				db36d0f15f8c27610bf6d80c9b438ed7: {
					values: [
						{
							value: "CFUFWD",
							name: "CFUFWD"
						},
						{
							value: "CFBFWD",
							name: "CFBFWD"
						},
						{
							value: "CFNRYFWD",
							name: "CFNRYFWD"
						},
						{
							value: "CFNRCFWD",
							name: "CFNRCFWD"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "SERVICEID,",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32U: {
					values: [
						{
							value: "second",
							name: "second"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Unit of Measure",
					priority: undefined
				},
				category: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Category",
					priority: undefined
				}
			},
			inputCharacteristics: {
				CFMSISDN: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: true,
					validation: "^.{1,256}$",
					name: "CFMSISDN",
					priority: undefined
				},
				CFTIME: {
					values: [
						{
							value: "5",
							name: "5"
						},
						{
							value: "25",
							name: "25"
						},
						{
							value: "20",
							name: "20"
						},
						{
							value: "15",
							name: "15"
						},
						{
							value: "10",
							name: "10"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME",
					priority: undefined
				},
				CFSTATUS: {
					values: [
						{
							value: "2",
							name: "2"
						},
						{
							value: "1",
							name: "1"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFSTATUS",
					priority: undefined
				},
				targetState: {
					values: [
						{
							value: "Inactive",
							name: "Inactive"
						},
						{
							value: "Active",
							name: "Active"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "TargetState",
					priority: undefined
				}
			},
			featureCharacteristics: []
		},
		allowedTransitions: [],
		usageCounters: [],
		characteristics: {
			CFMSISDN: "123456789",
			CFSTATUS: "1",
			SERVICEID: "CFUFWD"
		},
		instanceCharacteristics: {}
	},
	{
		id: "juanita-agreement1-callfwd-cfnryfwd",
		primaryId: "callfwd_cfnryfwd",
		validFor: {
			startDate: "2017-07-07T00:00:00Z",
			endDate: undefined
		},
		lifeCycleStatus: "ACTIVE",
		type: "CF",
		specification: {
			name: "CFSS CFNRY FWD FollowMeEverywhere",
			id: "callfwd_spec",
			specSubType: "BLOCKING",
			specType: "SERVICE",
			instanceCharacteristics: {
				specificationSubType: {
					values: [
						{
							value: "SUPPLEMENTARY",
							name: "SUPPLEMENTARY"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Type",
					priority: undefined
				},
				specificationSubSubtype: {
					values: [
						{
							value: "CALL_FORWARDING",
							name: "CALL_FORWARDING"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Sub Type",
					priority: undefined
				},
				versionIdentifier: {
					values: [
						{
							value: "1508524615065",
							name: "1508524615065"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Version Identifier",
					priority: undefined
				},
				isComposite: {
					values: [
						{
							value: "0",
							name: "0"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Is Composite",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32M: {
					values: [
						{
							value: "Duration",
							name: "Duration"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Measure",
					priority: undefined
				},
				db36d0f15f8c27610bf6d80c9b438ed7: {
					values: [
						{
							value: "CFUFWD",
							name: "CFUFWD"
						},
						{
							value: "CFBFWD",
							name: "CFBFWD"
						},
						{
							value: "CFNRYFWD",
							name: "CFNRYFWD"
						},
						{
							value: "CFNRCFWD",
							name: "CFNRCFWD"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "SERVICEID,",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32U: {
					values: [
						{
							value: "second",
							name: "second"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Unit of Measure",
					priority: undefined
				},
				category: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Category",
					priority: undefined
				}
			},
			inputCharacteristics: {
				CFMSISDN: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: true,
					validation: "^.{1,256}$",
					name: "CFMSISDN",
					priority: undefined
				},
				CFTIME: {
					values: [
						{
							value: "5",
							name: "5"
						},
						{
							value: "25",
							name: "25"
						},
						{
							value: "20",
							name: "20"
						},
						{
							value: "15",
							name: "15"
						},
						{
							value: "10",
							name: "10"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME",
					priority: undefined
				},
				CFSTATUS: {
					values: [
						{
							value: "2",
							name: "2"
						},
						{
							value: "1",
							name: "1"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFSTATUS",
					priority: undefined
				},
				targetState: {
					values: [
						{
							value: "Inactive",
							name: "Inactive"
						},
						{
							value: "Active",
							name: "Active"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "TargetState",
					priority: undefined
				}
			},
			featureCharacteristics: []
		},
		allowedTransitions: [],
		usageCounters: [],
		characteristics: {
			CFMSISDN: "123456789",
			CFSTATUS: "1",
			SERVICEID: "CFNRYFWD"
		},
		instanceCharacteristics: {}
	},
	{
		id: "juanita-agreement1-callfwd-cfbfwd",
		primaryId: "callfwd_cfbfwd",
		validFor: {
			startDate: "2017-07-07T00:00:00Z",
			endDate: undefined
		},
		lifeCycleStatus: "ACTIVE",
		type: "CF",
		specification: {
			name: "CFSS CFNRY FWD FollowMeEverywhere",
			id: "callfwd_spec",
			specSubType: "BLOCKING",
			specType: "SERVICE",
			instanceCharacteristics: {
				specificationSubType: {
					values: [
						{
							value: "SUPPLEMENTARY",
							name: "SUPPLEMENTARY"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Type",
					priority: undefined
				},
				specificationSubSubtype: {
					values: [
						{
							value: "CALL_FORWARDING",
							name: "CALL_FORWARDING"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Customer Facing Service Specification Sub Type",
					priority: undefined
				},
				versionIdentifier: {
					values: [
						{
							value: "1508524615065",
							name: "1508524615065"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Version Identifier",
					priority: undefined
				},
				isComposite: {
					values: [
						{
							value: "0",
							name: "0"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Is Composite",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32M: {
					values: [
						{
							value: "Duration",
							name: "Duration"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Measure",
					priority: undefined
				},
				db36d0f15f8c27610bf6d80c9b438ed7: {
					values: [
						{
							value: "CFUFWD",
							name: "CFUFWD"
						},
						{
							value: "CFBFWD",
							name: "CFBFWD"
						},
						{
							value: "CFNRYFWD",
							name: "CFNRYFWD"
						},
						{
							value: "CFNRCFWD",
							name: "CFNRCFWD"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "SERVICEID,",
					priority: undefined
				},
				ce0af26da20395a27f1012e2c1f2c32U: {
					values: [
						{
							value: "second",
							name: "second"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME Unit of Measure",
					priority: undefined
				},
				category: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "Category",
					priority: undefined
				}
			},
			inputCharacteristics: {
				CFMSISDN: {
					values: [],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: true,
					validation: "^.{1,256}$",
					name: "CFMSISDN",
					priority: undefined
				},
				CFTIME: {
					values: [
						{
							value: "5",
							name: "5"
						},
						{
							value: "25",
							name: "25"
						},
						{
							value: "20",
							name: "20"
						},
						{
							value: "15",
							name: "15"
						},
						{
							value: "10",
							name: "10"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFTIME",
					priority: undefined
				},
				CFSTATUS: {
					values: [
						{
							value: "2",
							name: "2"
						},
						{
							value: "1",
							name: "1"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "CFSTATUS",
					priority: undefined
				},
				targetState: {
					values: [
						{
							value: "Inactive",
							name: "Inactive"
						},
						{
							value: "Active",
							name: "Active"
						}
					],
					description: undefined,
					source: undefined,
					subType: undefined,
					mandatory: false,
					validation: undefined,
					name: "TargetState",
					priority: undefined
				}
			},
			featureCharacteristics: []
		},
		allowedTransitions: [],
		usageCounters: [],
		characteristics: {
			CFMSISDN: "123456789",
			CFSTATUS: "1",
			SERVICEID: "CFBFWD"
		},
		instanceCharacteristics: {}
	}
];

export default services;
