const rewire = require("rewire")
const calc_script = rewire("../calc_script")
const init = calc_script.__get__("init")
// @ponicode
describe("init", () => {
    test("0", () => {
        let result = init()
        expect(result).toMatchSnapshot()
    })
})
