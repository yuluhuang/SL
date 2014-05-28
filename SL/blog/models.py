from django.db import models
import json

# Create your models here.
class Users(models.Model):
    Id=models.AutoField(primary_key=True)
    userId=models.CharField(max_length=32)
    password=models.CharField(max_length=32)
    salt =models.CharField(max_length=32)
    name=models.CharField(max_length=10)
    qq=models.CharField(max_length=20)
    phone=models.CharField(max_length=20)
    Email=models.EmailField()
    icon=models.CharField(max_length=50)
    introduction=models.TextField()
    motto=models.TextField()
    identity=models.CharField(max_length=10)
    def __str__(self):
        return self.userId
    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))

class Theme(models.Model):
    themeId=models.AutoField(primary_key=True)
    type=models.CharField(max_length=10)
    themeName=models.CharField(max_length=50)
    themeContent=models.TextField()
    userId=models.CharField(max_length=32)
    show=models.BooleanField()
    icon=models.CharField(max_length=50)
    point=models.BooleanField()
    def __str__(self):
        return  '%s'%self.themeName

class Task(models.Model):
    taskId=models.AutoField(primary_key=True)
    type=models.CharField(max_length=10)
    themeId=models.IntegerField()
    taskName=models.CharField(max_length=50)
    taskContent=models.TextField()
    time=models.CharField(max_length=13)
    icon=models.CharField(max_length=50)
    hits=models.IntegerField()
    point=models.BooleanField()
    def __str__(self):
        return  '%s'%self.taskName

class  Collection(models.Model):
    collectId=models.AutoField(primary_key=True)
    userId=models.CharField(max_length=32)
    collectName=models.CharField(max_length=25)
    description=models.TextField()
    url=models.CharField(max_length=100)
    time=models.CharField(max_length=13)
    taskId=models.IntegerField()
    def __str__(self):
        return  '%s'%self.collectName

    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
    '''
    def toJSON(self):
    fields = []
    for field in self._meta.fields:
        fields.append(field.name)

    d = {}
    for attr in fields:
        d[attr] = getattr(self, attr)

    import json
    return json.dumps(d)
    '''

class Info(models.Model):
    infoId=models.AutoField(primary_key=True)
    infoTitle=models.CharField(max_length=50)
    infoContent=models.TextField()
    type=models.CharField(max_length=10)
    read=models.BooleanField()
    time=models.CharField(max_length=13)
    userId=models.CharField(max_length=32)
    def __str__(self):
        return  '%s'%self.infoTitle

class Item(models.Model):
    itemId=models.AutoField(primary_key=True)
    taskId=models.IntegerField()
    oldName=models.CharField(max_length=50)
    newName=models.CharField(max_length=50)
    type=models.CharField(max_length=10)
    path1=models.CharField(max_length=50)
    path2=models.CharField(max_length=50)
    theme=models.CharField(max_length=13)
    introduce=models.TextField()
    sort=models.IntegerField()
    download=models.BooleanField()
    def __str__(self):
        return  '%s'%self.oldName

class Note(models.Model):
    noteId=models.AutoField(primary_key=True)
    noteTitle=models.CharField(max_length=50)
    noteContent=models.TextField()
    noteTime=models.CharField(max_length=13)
    noteTag=models.CharField(max_length=10)
    userId=models.CharField(max_length=32)
    def __str__(self):
        return  '%s'%self.noteTitle




























