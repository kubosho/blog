resource "aws_iam_group_policy" "Administrator_policy" {
    name = "Administrator_policy"
    group = "${aws_iam_group.Administrator.id}"
    policy = "${file("aws_iam_policy/administrator.json")}"
}
