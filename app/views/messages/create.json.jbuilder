json.content @message.content
json.user_id @message.user_id
json.user_name Users.find(@message.user_id).name
json.updated_at_date @message.updated_at_date
