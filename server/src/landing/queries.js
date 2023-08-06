export const getPlatformRowCount= "SELECT platform, COUNT(*) AS row_count FROM question GROUP BY platform;"

export const getPlatformHintCount = "SELECT q.platform, COUNT(h.qid) AS hint_count FROM question q LEFT JOIN hint h ON q.qid = h.qid GROUP BY q.platform;"