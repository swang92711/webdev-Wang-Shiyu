import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';
import { Widget } from '../../../models/widget.model.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  uid: String;
  wid: String;
  pid: String;
  widgets: Widget[];
  constructor(private widgetService: WidgetService, private router: ActivatedRoute, private sanitizer: DomSanitizer) { }


  getYoutubeEmbedUrl(link: String) {
    let embedUrl = 'https://www.youtube.com/embed/'
    const parsedLink = link.split('/');
    embedUrl += parsedLink[parsedLink.length - 1];
    console.log(embedUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.widgets = this.widgetService.findWidgetsByPageId(this.pid);
    });
  }
}
