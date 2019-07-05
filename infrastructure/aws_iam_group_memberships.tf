resource "aws_iam_group_membership" "Administrator" {
    name = "Administrator_membership"
    users = [
        "kubosho",
    ]
    group = "Administrator"
}
