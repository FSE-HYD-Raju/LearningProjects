/* eslint react/prefer-stateless-function: 0 */
import yup from "yup";
import _ from "lodash";
import schemaRequirementMessages from "./schemas/SchemaRequirement.messages";
import schemaInvalidityMessages from "./schemas/SchemaInvalidity.messages";

import SchemaUtil from "../src/schemas/SchemaUtil";

const requirementMessages = {
	default: schemaRequirementMessages.default
};

const invalidityMessages = {
	default: schemaInvalidityMessages.default,
	passwordConfirmation: schemaInvalidityMessages.passwordConfirmation,
};

describe("SchemaUtil", () => {
	const getYupSchema = (options = {}) => schemaUtil.toYup({
		requirementMessages,
		invalidityMessages,
		...options
	});

	let schemaUtil;
	beforeEach(() => {
		schemaUtil = SchemaUtil.getInstance();
	});

	describe("generates a yup schema out of a JSON schema that has", () => {

		it("one boolean field that is required and is not nullable", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					/* nullable is not mentioned here because it is false by default. */
					topSecretPrivacy: {
						type: "boolean",
						required: true
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.topSecretPrivacy instanceof yup.boolean);
			expect(
				yupSchema.fields.topSecretPrivacy.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0);

			const data = {
				topSecretPrivacy: null
			};

			return yupSchema
				.validate(data)
				.then(valid => {
					throw new Error("should not be valid");
				})
				.catch(err => {
					expect.assertions(2);
					expect(err).toEqual(
						expect.objectContaining({
							name: "ValidationError"
						})
					);
				});
		});

		it("one boolean field that is not required and is nullable", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					topSecretPrivacy: {
						type: "boolean",
						required: false,
						nullable: true
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			const data = {
				topSecretPrivacy: null
			};

			return yupSchema
				.validate(data)
				.then(valid => {
					expect.assertions(1);
					expect(valid).toEqual(data);
				})
				.catch(err => {
					throw err;
				});
		});

		function assertRequiredStringField(yupSchema, fieldName) {
			expect(yupSchema.fields[fieldName] instanceof yup.string);
			expect(
				yupSchema.fields[fieldName].tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0);
		}

		it("one string field that is required", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					firstName: {
						type: "string",
						required: true
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			assertRequiredStringField(yupSchema, "firstName");
		});

		it("one string field that is required and does not accept whitespace for value", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					firstName: {
						type: "string",
						required: true
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			assertRequiredStringField(yupSchema, "firstName");

			return yupSchema
				.isValid({
					firstName: "  "
				})
				.then(valid => {
					expect.assertions(2);
					expect(!valid).toEqual(true);
				});
		});

		it("one date field that is required", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					birthDay: {
						type: "date",
						required: true
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.birthDay instanceof yup.date);
			expect(
				yupSchema.fields.birthDay.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0);
		});

		it("one string field that considers certain values valid but only one of them can be selected", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					maritalStatus: {
						type: "string",
						validation: {
							enum: [
								"single",
								"married",
								"divorced",
								"widowed",
								"cohabiting"
							]
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.maritalStatus instanceof yup.string);
			expect(
				_.values(yupSchema.fields.maritalStatus._whitelist._map).sort()
			).toEqual(
				jsonSchema.properties.maritalStatus.validation.enum.sort()
			);
			expect(
				yupSchema.fields.maritalStatus._whitelistError.TEST_NAME
			).toEqual("oneOf");
		});

		it("one string field that is validated using a regexp", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					email: {
						type: "string",
						validation: {
							regexp: ".+\\@.+\\..+"
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.email instanceof yup.string);

			const regexes = yupSchema.fields.email.tests
				.map(t => t.TEST)
				.filter(t => "params" in t)
				.map(t => t.params)
				.filter(p => p.regex);
			expect(regexes.length).toBeGreaterThan(0);
		});

		it("one string field that is validated using length range", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					postalCode: {
						type: "string",
						validation: {
							length: {
								min: 4,
								max: 6
							}
						},
						length: {
							min: 4,
							max: 6
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.postalCode instanceof yup.string);

			const minTests = yupSchema.fields.postalCode.tests.filter(
				t => t.TEST_NAME === "min"
			);
			// is-postalCode-of-correct-length
			expect(minTests.length).toEqual(1);

			const maxTests = yupSchema.fields.postalCode.tests.filter(
				t => t.TEST_NAME === "max"
			);
			expect(maxTests.length).toEqual(1);

			expect(minTests[0].TEST.params.min).toEqual(
				jsonSchema.properties.postalCode.length.min
			);
			expect(maxTests[0].TEST.params.max).toEqual(
				jsonSchema.properties.postalCode.length.max
			);
		});

		it("one string field that is validated using a ready email validator", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "person",
				type: "object",
				properties: {
					email: {
						type: "string",
						validation: {
							email: true
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.email instanceof yup.string);

			const regexes = yupSchema.fields.email.tests
				.map(t => t.TEST)
				.filter(t => "params" in t)
				.map(t => t.params)
				.filter(p => p.regex);
			expect(regexes.length).toBeGreaterThan(0);
		});

		it("two password fields for setting and confirming a password", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "password",
				type: "object",
				properties: {
					password: {
						required: true,
						editable: true,
						type: "string",
						validation: {
							length: {
								min: 8
							}
						}
					},
					passwordConfirmation: {
						required: true,
						editable: true,
						type: "string",
						validation: {
							equals: "#.properties.password"
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.password instanceof yup.string);
			expect(yupSchema.fields.passwordConfirmation instanceof yup.string);

			expect(
				yupSchema.fields.password.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0);

			expect(
				yupSchema.fields.passwordConfirmation.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0);
			expect(
				yupSchema.fields.passwordConfirmation.tests.filter(
					t => t.TEST_NAME === "sameAs"
				).length
			).toEqual(1);
		});

		it("many fields of which one also consists of multiple fields", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "plan-buy",
				type: "object",
				properties: {
					data: {
						type: "string",
						required: true
					},
					suspensionForAllVoiceAndDataServices: {
						type: "boolean"
					},
					deliveryAddress: {
						type: "object",
						properties: {
							street: {
								type: "string",
								required: true
							},
							city: {
								type: "string",
								required: true
							}
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.data instanceof yup.string);
			expect(
				yupSchema.fields.suspensionForAllVoiceAndDataServices instanceof
					yup.boolean
			);
			expect(yupSchema.fields.deliveryAddress instanceof yup.object);

			assertRequiredStringField(
				yupSchema.fields.deliveryAddress,
				"street"
			);
			assertRequiredStringField(yupSchema.fields.deliveryAddress, "city");
		});

		it("a key-value pair", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "key-value pair",
				type: "object",
				properties: {
					key: {
						type: "string",
						required: true
					},
					value: {
						type: "string",
						required: false,
						nullable: true
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(Object.keys(yupSchema.fields).sort()).toEqual(
				["key", "value"].sort()
			);
			expect(
				yupSchema.fields.key.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0, "Field 'key' should have been required");
			expect(
				yupSchema.fields.value.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toEqual(0, "Field 'value' should not have been required");
		});

		/* NOTE while this passes, we have not yet tested how yup.array().of(yup.string()) behaves ! */
		it("one field that consists of any number of string fields", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "shakespeare by infinite number of monkeys",
				type: "object",
				properties: {
					data: {
						type: "array",
						items: {
							type: "string",
							required: true
						}
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(yupSchema.fields.data._subType.tests.length).toBeGreaterThan(
				0,
				"The subtype should have at least one test"
			);
			expect(
				yupSchema.fields.data._subType.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0, "The subtype should have been required");
		});

		/* TODO NOTE while this passes, we have not yet tested how yup.array().of(...whatever...) behaves! */
		it("a stack of key-value pairs", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "key-value pairs",
				type: "array",
				items: {
					type: "object",
					properties: {
						key: {
							type: "string",
							required: true
						},
						value: {
							type: "string",
							required: false,
							nullable: true
						}
					},
					required: false,
					length: {
						min: 1
					}
				}
			};

			const yupSchema = getYupSchema({ jsonSchema });

			expect(Object.keys(yupSchema._subType.fields).sort()).toEqual(
				["key", "value"].sort()
			);
			expect(
				yupSchema._subType.fields.key.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toBeGreaterThan(0, "Field 'key' should have been required");
			expect(
				yupSchema._subType.fields.value.tests.filter(
					t => t.TEST_NAME === "required"
				).length
			).toEqual(0, "Field 'value' should not have been required");
		});

		describe("phone number validation", () => {
			it("in optional field", () => {
				const jsonSchema = {
					$schema: "http://json-schema.org/draft-04/schema#",
					title: "phoneNumber",
					type: "object",
					properties: {
						mobileNumber: {
							type: "string",
							required: false,
							editable: false,
							validation: {
								phone: true
							}
						}
					}
				};

				const yupSchema = getYupSchema({ jsonSchema });

				expect(yupSchema.fields.mobileNumber.tests.length).toEqual(
					1,
					"Invalidity test should exist"
				);
				expect(
					yupSchema.fields.mobileNumber.tests[0].TEST.params.regex
				).toBeDefined();
			});

			it("in a mandatory field, validatable value has spaces which is valid", () => {
				const jsonSchema = {
					$schema: "http://json-schema.org/draft-04/schema#",
					title: "phoneNumber",
					type: "object",
					properties: {
						mobileNumber: {
							type: "string",
							required: true,
							editable: true,
							validation: {
								phone: true
							}
						}
					}
				};

				const yupSchema = getYupSchema({ jsonSchema });

				const regexTests = yupSchema.fields.mobileNumber.tests
					.map(t => t.TEST)
					.filter(t => t.params)
					.map(t => t.params)
					.map(p => p.regex);

				expect(regexTests.length).toBeGreaterThan(0);

				return yupSchema
					.isValid({
						mobileNumber: "+1 234"
					})
					.then(valid => {
						expect.assertions(2);
						expect(!valid).toEqual(false);
					});
			});

			it("in a mandatory field with custom regexp, validatable value has spaces which is invalid", () => {
				const regexp = "^$|^(\\+?)([0-9]+)$";

				const jsonSchema = {
					$schema: "http://json-schema.org/draft-04/schema#",
					title: "phoneNumber",
					type: "object",
					properties: {
						mobileNumber: {
							type: "string",
							required: true,
							editable: true,
							validation: {
								regexp
							}
						}
					}
				};

				const yupSchema = getYupSchema({ jsonSchema });

				const regexTests = yupSchema.fields.mobileNumber.tests
					.map(t => t.TEST)
					.filter(t => t.params)
					.map(t => t.params)
					.map(p => p.regex);

				expect(regexTests.length).toBeGreaterThan(0);
				expect(regexTests[0]).toEqual(new RegExp(regexp));

				return yupSchema
					.isValid({
						mobileNumber: "+1 234"
					})
					.then(valid => {
						expect.assertions(3);
						expect(!valid).toEqual(true);
					});
			});

			it("in a mandatory field with custom regexp, validatable value has spaces which is valid", () => {
				const regexp = "^$|^(\\+?)([0-9\\ ]+)$";

				const jsonSchema = {
					$schema: "http://json-schema.org/draft-04/schema#",
					title: "phoneNumber",
					type: "object",
					properties: {
						mobileNumber: {
							type: "string",
							required: true,
							editable: true,
							validation: {
								regexp
							}
						}
					}
				};

				const yupSchema = getYupSchema({ jsonSchema });

				const regexTests = yupSchema.fields.mobileNumber.tests
					.map(t => t.TEST)
					.filter(t => t.params)
					.map(t => t.params)
					.map(p => p.regex);

				expect(regexTests.length).toBeGreaterThan(0);
				expect(regexTests[0]).toEqual(new RegExp(regexp));

				return yupSchema
					.isValid({
						mobileNumber: "+1 234"
					})
					.then(valid => {
						expect.assertions(3);
						expect(!valid).toEqual(false);
					});
			});
		});

		describe("a field that is validated only when another field has", () => {
			const jsonSchema = {
				$schema: "http://json-schema.org/draft-04/schema#",
				title: "conditional validation",
				type: "object",
				properties: {
					number: {
						type: "string",
						required: false
					},
					date: {
						type: "date",
						required: false,
						nullable: false,
						validation: {
							whenEntered: "#.properties.number"
						}
					}
				}
			};

			let yupSchema;
			beforeEach(() => {
				yupSchema = getYupSchema({ jsonSchema });
			});

			it("null for value, which is considered as invalid", () => {
				return yupSchema
					.isValid({
						number: "1234",
						date: null
					})
					.then(valid => {
						expect.assertions(1);
						expect(valid).toEqual(
							false,
							"null for date should not pass as valid"
						);
					});
			});

			it("a date for value which is considered valid", () => {
				return yupSchema
					.isValid({
						number: "1234",
						date: new Date()
					})
					.then(valid => {
						expect.assertions(1);
						expect(valid).toEqual(
							true,
							"a Date instance should pass as valid"
						);
					});
			});
		});
	});

	describe("a schema that has a field A with conditional validation", () => {
		const jsonSchema = {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "conditional validation",
			type: "object",
			properties: {
				isCardStolenOrLost: {
					type: "boolean",
					required: true,
					nullable: false
				},
				iccid: {
					type: "string",
					required: false,
					nullable: false,
					validation: {
						skip: {
							whenEntered: false,
							field: "#.properties.isCardStolenOrLost"
						},
						regexp: "[a-z0-9]{4}"
					}
				}
			}
		};

		let yupSchema;
		beforeEach(() => {
			yupSchema = getYupSchema({ jsonSchema });
		});

		it("is valid when A has a value and another field is false", () => {
			const data = {
				isCardStolenOrLost: false,
				iccid: "a1b2"
			};

			return yupSchema
				.validate(data)
				.then(valid => {
					expect.assertions(1);
					expect(valid).toEqual(data);
				})
				.catch(err => {
					throw err;
				});
		});

		it("is valid when A is an empty string while another field is true", () => {
			const data = {
				isCardStolenOrLost: true,
				iccid: ""
			};

			return yupSchema
				.validate(data)
				.then(valid => {
					expect.assertions(1);
					expect(valid).toEqual(data);
				})
				.catch(err => {
					throw err;
				});
		});

		it("is invalid when A is an empty string and another field is false", () => {
			const data = {
				isCardStolenOrLost: false,
				iccid: ""
			};

			return yupSchema
				.validate(data)
				.then(valid => {
					throw new Error("should not be valid");
				})
				.catch(err => {
					expect.assertions(2);
					expect(err).not.toEqual("should not be valid");
					expect(err).toEqual(
						expect.objectContaining({
							name: "ValidationError"
						})
					);
				});
		});

		/* should be invalid, but maybe yup just doesn't do that. */
		xit(
			"is invalid when A does not exist and another field is true",
			() => {
				const data = {
					isCardStolenOrLost: true
				};

				return yupSchema
					.validate(data)
					.then(valid => {
						throw new Error("should not be valid");
					})
					.catch(err => {
						if (err.message === "should not be valid") {
							throw err;
						}

						expect(err).toEqual(
							expect.objectContaining({
								name: "ValidationError"
							})
						);
					});
			}
		);
	});

	describe("a date field that has both a minimum and a maximum value", () => {
		const jsonSchema = {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "max date",
			type: "object",
			properties: {
				birthDay: {
					type: "date",
					required: true,
					nullable: false,
					validation: {
						length: {
							min: "yesterday",
							max: "now"
						}
					}
				}
			}
		};

		let yupSchema;
		beforeEach(() => {
			yupSchema = getYupSchema({ jsonSchema });
		});

		it("that has both a minimum and a maximum value", () => {
			expect(
				yupSchema.fields.birthDay.tests.filter(
					t => t.TEST_NAME === "min"
				).length
			).toEqual(1, "Field 'birthDay' should have a 'min' test");

			expect(
				yupSchema.fields.birthDay.tests.filter(
					t => t.TEST_NAME === "max"
				).length
			).toEqual(1, "Field 'birthDay' should have a 'max' test");
		});

		it("finds a date too early as invalid", () => {
			const inputDate = new Date();
			inputDate.setFullYear(1800);

			return yupSchema
				.isValid({
					birthDay: inputDate
				})
				.then(valid => {
					expect.assertions(1);
					expect(valid).not.toEqual(
						true,
						"a date in the year 1800 is way too early as anyone's birthday and so should be invalid"
					);
				});
		});

		it("finds a date too late as invalid", () => {
			const inputDate = new Date();
			inputDate.setDate(inputDate.getDate() + 2);

			return yupSchema
				.isValid({
					birthDay: inputDate
				})
				.then(valid => {
					expect.assertions(1);
					expect(valid).not.toEqual(
						true,
						"a date two days from now is later than tomorrow and so should be invalid"
					);
				});
		});

		it("finds a date in between as valid", () => {
			const inputDate = new Date();
			inputDate.setHours(inputDate.getHours() - 1);

			return yupSchema
				.isValid({
					birthDay: inputDate
				})
				.then(valid => {
					expect.assertions(1);
					expect(valid).not.toEqual(
						false,
						"a date in between yesterday and now should be valid"
					);
				});
		});
	});

	describe("sets labels", () => {
		const jsonSchema = {
			$schema: "http://json-schema.org/draft-04/schema#",
			title: "person-details",
			type: "object",
			properties: {
				name: {
					type: "string"
				},
				birthDay: {
					title: "birthDayTitle",
					type: "string"
				},
			}
		};

		let yupSchema;
		beforeEach(() => {
			yupSchema = getYupSchema({ jsonSchema });
		});

		it("for schemas", () => {
			expect(yupSchema._label).toEqual(jsonSchema.title);
		});

		it("for fields, using the field key", () => {
			expect(yupSchema.fields.birthDay._label).toEqual(jsonSchema.properties.birthDay.title);
		});

		it("for fields, using the title", () => {
			expect(yupSchema.fields.name._label).toEqual("name");
		});
	});

	it("throws an error when JSON schema is empty", () => {
		expect(() => {
			schemaUtil.toYup({
				jsonSchema: null,
				requirementMessages,
				invalidityMessages
			});
		}).toThrow("Schema is empty");
	});
});
