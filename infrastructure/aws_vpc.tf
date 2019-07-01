#####################################
# VPC Settings
#####################################
resource "aws_vpc" "vpc_main" {
    cidr_block = "${var.root_segment}"
    tags = {
        Name = "${var.app_name}"
    }
}

#####################################
# Internet Gateway Settings
#####################################
resource "aws_internet_gateway" "vpc_main_igw" {
    vpc_id = "${aws_vpc.vpc_main.id}"
    tags = {
        Name = "${var.app_name}_igw"
    }
}

#####################################
# Public Subnets Settings
#####################################
resource "aws_subnet" "vpc_main_public_subnet1" {
    vpc_id = "${aws_vpc.vpc_main.id}"
    cidr_block = "${cidrsubnet(aws_vpc.vpc_main.cidr_block, 8, 0)}"
    availability_zone = "${var.public_segment1_az}"
    tags = {
        Name = "${var.app_name}_public_subnet1"
    }
}
resource "aws_subnet" "vpc_main_public_subnet2" {
    vpc_id = "${aws_vpc.vpc_main.id}"
    cidr_block = "${cidrsubnet(aws_vpc.vpc_main.cidr_block, 8, 1)}"
    availability_zone = "${var.public_segment2_az}"
    tags = {
        Name = "${var.app_name}_public_subnet2"
    }
}

#####################################
# Routes Table Settings
#####################################
resource "aws_route_table" "vpc_main_public_rt" {
    vpc_id = "${aws_vpc.vpc_main.id}"
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.vpc_main_igw.id}"
    }
    tags = {
        Name = "${var.app_name} public_rt"
    }
}

resource "aws_route_table_association" "vpc_main_rta1" {
    subnet_id = "${aws_subnet.vpc_main_public_subnet1.id}"
    route_table_id = "${aws_route_table.vpc_main_public_rt.id}"
}

resource "aws_route_table_association" "vpc_main_rta2" {
    subnet_id = "${aws_subnet.vpc_main_public_subnet2.id}"
    route_table_id = "${aws_route_table.vpc_main_public_rt.id}"
}
