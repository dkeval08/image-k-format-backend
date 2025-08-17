import MockData from "../../Mockdata.json" with { type: "json" };

export const getUsers = async (req,res) => {
    try {
    const data = await MockData;
    return res.json({status: true,data: data});
    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }
}   