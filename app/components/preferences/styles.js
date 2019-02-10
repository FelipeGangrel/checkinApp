import { colors } from "../../colors";

export default styles = {
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: colors.light.base,
    borderBottomWidth: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: colors.light.alternative,
  },
  iconSize: 28,
  iconColor: colors.light.alternative,
}