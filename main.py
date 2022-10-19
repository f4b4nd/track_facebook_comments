import facebook


token = "EAAI5v9gBwtMBAGp9XRblqIddgbDuZBLzYkJeo5D5aOiB1SZATHhUtRh04cZCrMa6EsTrsXeBOKoViFCBV0ZBf7RvBqQI4OvfL9Vbgemh2x2SlwvocTKd38vuLnMaKZCjdpRa7gGRZAFIGQJGStSKSmsapb6Mqx7LoOlvNZBG6YjTyH25MVXbzgTcSOAJ9KOlslqayn5PAZAkxHRCKXaj8ytU"
post_id = "656318052559629"
graph = facebook.GraphAPI(access_token=token, version="2.12")
post = graph.get_object(id=post_id, fields='message')
print(post['message'])
