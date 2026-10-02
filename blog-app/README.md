# Blog Application

## Overview

This project is a blog platform built with GraphQL and TypeScript, supporting content publishing, user authentication, and personal profile management.

## Features

- Users can create and publish blog posts
- Users can view published posts
- Secure authentication system for account access
- Users can view and manage their own profile

## Data Model

### Post
- id
- title
- content
- authorId
- createdAt
- updatedAt
- published

### User
- id
- name
- email
- password
- createdAt
- updatedAt
- profile

### Profile
- id
- bio
- createdAt
- updatedAt
- userId

## Technology Stack

- GraphQL
- TypeScript
- PostgreSQL
- Prisma
