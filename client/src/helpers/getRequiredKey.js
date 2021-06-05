export default function getRequiredKey(item) {
  let {    
    courseId,
    id,
    state,
    alternateLink,
    creationTime,
    updateTime,
    dueDate,
    dueTime,
    scheduledTime,
    associatedWithDeveloper,
    assigneeMode,
    individualStudentsOptions,
    creatorUserId,
    selected,
    topicId,
    ...newItem
  } = item

  return JSON.parse(JSON.stringify(newItem));
}

