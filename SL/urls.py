from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

'''
login
'''
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'SL.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^loginhtml/$','SL.blog.views.loginhtml'),#html
    url(r'^login$','SL.blog.views.login'),#html
    url(r'^islogin$','SL.blog.views.islogin'),
    url(r'^logout$','SL.blog.views.logout'),
    url(r'^index/$','SL.blog.views.index'),#html
)
'''
collect
'''
urlpatterns += patterns('',
    url(r'^collecthtml/$','SL.blog.views.collecthtml'),#html
    url(r'^getcollect$','SL.blog.views.getcollect'),
)

'''
myhome
'''
urlpatterns += patterns('',
    url(r'^myhomehtml/$','SL.blog.views.myhomehtml'),#html
)
'''
mydetails
'''
urlpatterns += patterns('',
    url(r'^upload_img/$','SL.blog.views.upload_img'),#upload
    url(r'^mydetailshtml/$','SL.blog.views.mydetailshtml'),
    url(r'^cutpic$','SL.blog.views.cutimage'),
)

'''
note
'''
urlpatterns += patterns('',
    url(r'^notehtml/$','SL.blog.views.notehtml'),
    url(r'^note$','SL.blog.views.note'),
    url(r'^noteSearchByUsername$','SL.blog.views.noteSearchByUsername'),
    url(r'^noteSearchByNoteId$','SL.blog.views.noteSearchByNoteId'),
    url(r'^splice','SL.blog.views.splice'),

)
'''
tel
'''
urlpatterns += patterns('',
    url(r'^showTel$','SL.blog.views.showTel'),
    url(r'^showtelhtml/$','SL.blog.views.showtelhtml'),

)
'''
spiderIp
'''
urlpatterns += patterns('',
    url(r'^spiderIp$','SL.blog.views.spiderIp'),


)